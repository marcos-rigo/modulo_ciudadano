import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { query, withTransaction, queryConn } from './db'
import type { SubtopicState, WizardStep } from './types'

// ── Tipos ─────────────────────────────────────────────────────────────────────

export interface RegisterData {
  email:    string
  password: string
  fullName: string
  dni:      string
  ciudad:   string
}

export interface MysqlUserData {
  id:            number
  email:         string
  fullName:      string
  dni:           string
  ciudad:        string
  emailVerified: boolean
  consent:       boolean
}

export interface ProgressData {
  screen:           'dashboard' | 'wizard' | 'certificate'
  activeSubtopicId: number | null
  subtopics:        SubtopicState[]
}

export interface LoginResponse {
  user:     MysqlUserData
  progress: ProgressData
}

// ── Estado inicial de subtemas ─────────────────────────────────────────────────

const INITIAL_SUBTOPICS: SubtopicState[] = [
  { id: 1, status: 'in-progress', currentStep: 'intro', score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
  { id: 2, status: 'locked',      currentStep: 'intro', score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
  { id: 3, status: 'locked',      currentStep: 'intro', score: null, passed: false, introRead: false, videoWatched: false, podcastListened: false },
]

// ── Conversión filas DB → SubtopicState ───────────────────────────────────────

interface SubtemaRow {
  subtema_id:        number
  estado:            string
  paso_actual:       string
  score:             number | null
  aprobado:          number | boolean
  intro_leida:       number | boolean
  video_visto:       number | boolean
  podcast_escuchado: number | boolean
}

function rowToSubtopicState(row: SubtemaRow): SubtopicState {
  return {
    id:              row.subtema_id,
    status:          row.estado as SubtopicState['status'],
    currentStep:     row.paso_actual as WizardStep,
    score:           row.score,
    passed:          Boolean(row.aprobado),
    introRead:       Boolean(row.intro_leida),
    videoWatched:    Boolean(row.video_visto),
    podcastListened: Boolean(row.podcast_escuchado),
  }
}

// ── Registro ───────────────────────────────────────────────────────────────────

export async function registerUser(data: RegisterData): Promise<MysqlUserData> {
  const { email, password, fullName, dni, ciudad } = data
  const normalizedEmail = email.toLowerCase().trim()

  const existing = await query<unknown[]>(
    'SELECT id FROM usuarios WHERE email = ?',
    [normalizedEmail]
  )
  if ((existing as unknown[]).length > 0) {
    throw new Error('Ya existe una cuenta con ese correo.')
  }

  const passwordHash = await bcrypt.hash(password, 10)

  // Toda la creación inicial en una sola transacción
  const userId = await withTransaction(async (conn) => {
    const [insertResult] = await conn.execute(
      'INSERT INTO usuarios (email, password_hash, nombre_completo, dni, ciudad) VALUES (?, ?, ?, ?, ?)',
      [normalizedEmail, passwordHash, fullName.trim(), dni.trim(), ciudad.trim()]
    ) as [{ insertId: number }, unknown]

    const newUserId = insertResult.insertId
    console.log(`[registerUser] Usuario creado con id=${newUserId}`)

    await queryConn(conn,
      `INSERT INTO estado_usuario
         (usuario_id, pantalla_actual, subtema_activo, certificado_emitido, modulos_completados)
       VALUES (?, 'dashboard', 1, FALSE, 0)`,
      [newUserId]
    )
    console.log(`[registerUser] estado_usuario creado para id=${newUserId}`)

    // Insertar cada subtema por separado para evitar problemas con prepared statements multi-row
    await queryConn(conn,
      `INSERT INTO progreso_subtemas (usuario_id, subtema_id, estado, paso_actual) VALUES (?, 1, 'in-progress', 'intro')`,
      [newUserId]
    )
    await queryConn(conn,
      `INSERT INTO progreso_subtemas (usuario_id, subtema_id, estado, paso_actual) VALUES (?, 2, 'locked', 'intro')`,
      [newUserId]
    )
    await queryConn(conn,
      `INSERT INTO progreso_subtemas (usuario_id, subtema_id, estado, paso_actual) VALUES (?, 3, 'locked', 'intro')`,
      [newUserId]
    )
    console.log(`[registerUser] 3 filas en progreso_subtemas creadas para id=${newUserId}`)

    return newUserId
  })

  return {
    id:            userId,
    email:         normalizedEmail,
    fullName:      fullName.trim(),
    dni:           dni.trim(),
    ciudad:        ciudad.trim(),
    emailVerified: false,
    consent:       true,
  }
}

// ── Login ──────────────────────────────────────────────────────────────────────

export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const normalizedEmail = email.toLowerCase().trim()

  const rows = await query<{
    id: number
    password_hash: string
    nombre_completo: string
    dni: string
    ciudad: string
    email_verificado: number
  }[]>(
    'SELECT id, password_hash, nombre_completo, dni, ciudad, email_verificado FROM usuarios WHERE email = ?',
    [normalizedEmail]
  )

  if (rows.length === 0) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  const dbUser = rows[0]
  const valid = await bcrypt.compare(password, dbUser.password_hash)
  if (!valid) {
    throw new Error('Correo o contraseña incorrectos.')
  }

  console.log(`[loginUser] Login exitoso para id=${dbUser.id}`)

  const user: MysqlUserData = {
    id:            dbUser.id,
    email:         normalizedEmail,
    fullName:      dbUser.nombre_completo,
    dni:           dbUser.dni,
    ciudad:        dbUser.ciudad,
    emailVerified: Boolean(dbUser.email_verificado),
    consent:       true,
  }

  const progress = await getUserProgress(dbUser.id)
  return { user, progress }
}

// ── Progreso ───────────────────────────────────────────────────────────────────

export async function getUserProgress(userId: number): Promise<ProgressData> {
  const estadoRows = await query<{
    pantalla_actual: string
    subtema_activo: number | null
    certificado_emitido: number
  }[]>(
    'SELECT pantalla_actual, subtema_activo, certificado_emitido FROM estado_usuario WHERE usuario_id = ?',
    [userId]
  )

  const subtemaRows = await query<SubtemaRow[]>(
    `SELECT subtema_id, estado, paso_actual, score, aprobado,
            intro_leida, video_visto, podcast_escuchado
     FROM progreso_subtemas
     WHERE usuario_id = ?
     ORDER BY subtema_id`,
    [userId]
  )

  console.log(`[getUserProgress] usuario_id=${userId} — estado_rows=${estadoRows.length}, subtema_rows=${subtemaRows.length}`)

  const screen = (estadoRows[0]?.pantalla_actual ?? 'dashboard') as ProgressData['screen']
  const activeSubtopicId = estadoRows[0]?.subtema_activo ?? null

  const subtopics: SubtopicState[] = subtemaRows.length > 0
    ? subtemaRows.map(rowToSubtopicState)
    : INITIAL_SUBTOPICS

  const completados = subtopics.filter((s) => s.passed).length
  console.log(`[getUserProgress] screen=${screen} completados=${completados} subtopics=${JSON.stringify(subtopics.map(s => ({ id: s.id, status: s.status, passed: s.passed, score: s.score })))}`)

  return { screen, activeSubtopicId, subtopics }
}

// ── Sync progreso ──────────────────────────────────────────────────────────────

export async function updateProgress(userId: number, progressData: ProgressData): Promise<void> {
  const { screen, activeSubtopicId, subtopics } = progressData
  const modulosCompletados = subtopics.filter((s) => s.passed).length
  const certificadoEmitido = screen === 'certificate'

  await query(
    `UPDATE estado_usuario
     SET pantalla_actual      = ?,
         subtema_activo       = ?,
         certificado_emitido  = ?,
         modulos_completados  = ?,
         fecha_certificado    = IF(? = TRUE AND fecha_certificado IS NULL, NOW(), fecha_certificado)
     WHERE usuario_id = ?`,
    [screen, activeSubtopicId, certificadoEmitido, modulosCompletados, certificadoEmitido, userId]
  )

  for (const s of subtopics) {
    await query(
      `INSERT INTO progreso_subtemas
         (usuario_id, subtema_id, estado, paso_actual, score, aprobado,
          intro_leida, video_visto, podcast_escuchado)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         estado            = VALUES(estado),
         paso_actual       = VALUES(paso_actual),
         score             = VALUES(score),
         aprobado          = VALUES(aprobado),
         intro_leida       = VALUES(intro_leida),
         video_visto       = VALUES(video_visto),
         podcast_escuchado = VALUES(podcast_escuchado),
         completado_en     = IF(VALUES(aprobado) = TRUE AND completado_en IS NULL, NOW(), completado_en)`,
      [userId, s.id, s.status, s.currentStep, s.score, s.passed,
       s.introRead, s.videoWatched, s.podcastListened]
    )
  }

  console.log(`[updateProgress] usuario_id=${userId} screen=${screen} completados=${modulosCompletados}`)
}

// ── Reset de contraseña ────────────────────────────────────────────────────────

export async function resetPasswordRequest(email: string): Promise<string> {
  const normalizedEmail = email.toLowerCase().trim()
  const rows = await query<{ id: number }[]>(
    'SELECT id FROM usuarios WHERE email = ?',
    [normalizedEmail]
  )
  if (rows.length === 0) {
    throw new Error('No encontramos ninguna cuenta con ese correo.')
  }

  const token = crypto.randomBytes(32).toString('hex')
  await query(
    'INSERT INTO password_resets (email, token, expira_en) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 1 HOUR))',
    [normalizedEmail, token]
  )

  return token
}

export async function resetPasswordConfirm(token: string, newPassword: string): Promise<void> {
  const rows = await query<{ email: string }[]>(
    'SELECT email FROM password_resets WHERE token = ? AND usado = FALSE AND expira_en > NOW()',
    [token]
  )
  if (rows.length === 0) {
    throw new Error('El enlace de recuperación no es válido o ya expiró.')
  }

  const { email } = rows[0]
  const passwordHash = await bcrypt.hash(newPassword, 10)
  await query('UPDATE usuarios SET password_hash = ? WHERE email = ?', [passwordHash, email])
  await query('UPDATE password_resets SET usado = TRUE WHERE token = ?', [token])
}
