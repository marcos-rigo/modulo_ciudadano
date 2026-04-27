import mysql from 'mysql2/promise'

const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  port:     parseInt(process.env.DB_PORT || '3306'),
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 20000,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
})

export async function query<T = unknown>(sql: string, params?: unknown[]): Promise<T> {
  const [results] = await pool.execute(sql, params)
  return results as T
}

// Ejecuta un bloque de queries dentro de una transacción.
// Si el callback lanza, hace rollback automático.
export async function withTransaction<T>(
  callback: (conn: mysql.PoolConnection) => Promise<T>
): Promise<T> {
  const conn = await pool.getConnection()
  await conn.beginTransaction()
  try {
    const result = await callback(conn)
    await conn.commit()
    return result
  } catch (err) {
    await conn.rollback()
    throw err
  } finally {
    conn.release()
  }
}

// Query usando una conexión específica (para usar dentro de withTransaction)
export async function queryConn<T = unknown>(
  conn: mysql.PoolConnection,
  sql: string,
  params?: unknown[]
): Promise<T> {
  const [results] = await conn.execute(sql, params)
  return results as T
}

export default pool
