-- ============================================================
-- Ciudadanía Digital — Schema MySQL
-- Ejecutar en phpMyAdmin: base de datos u764418639_ciudadania
-- ============================================================

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  nombre_completo VARCHAR(255) NOT NULL,
  dni VARCHAR(20) NOT NULL,
  ciudad VARCHAR(100) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_verificado BOOLEAN DEFAULT FALSE,
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS progreso_subtemas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  subtema_id INT NOT NULL,
  estado ENUM('locked','in-progress','completed') DEFAULT 'locked',
  paso_actual VARCHAR(50) DEFAULT 'intro',
  score INT DEFAULT NULL,
  aprobado BOOLEAN DEFAULT FALSE,
  intro_leida BOOLEAN DEFAULT FALSE,
  video_visto BOOLEAN DEFAULT FALSE,
  podcast_escuchado BOOLEAN DEFAULT FALSE,
  intentos_quiz INT DEFAULT 0,
  completado_en TIMESTAMP NULL,
  ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_subtema (usuario_id, subtema_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS estado_usuario (
  usuario_id INT PRIMARY KEY,
  pantalla_actual ENUM('dashboard','wizard','certificate') DEFAULT 'dashboard',
  subtema_activo INT DEFAULT NULL,
  certificado_emitido BOOLEAN DEFAULT FALSE,
  fecha_certificado TIMESTAMP NULL,
  modulos_completados INT DEFAULT 0,
  ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS password_resets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  token VARCHAR(255) NOT NULL,
  expira_en TIMESTAMP NOT NULL,
  usado BOOLEAN DEFAULT FALSE,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_token (token)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
