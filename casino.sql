-- Base de datos del Casino DAW
-- Importar en phpMyAdmin (pestaña Importar) o pegar en la pestaña SQL

CREATE DATABASE IF NOT EXISTS casino CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE casino;

DROP TABLE IF EXISTS usuarios;
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,          -- guardada con password_hash()
  saldo DECIMAL(10,2) NOT NULL DEFAULT 0,
  rol ENUM('admin','jugador') NOT NULL DEFAULT 'jugador'
);

-- Usuarios de prueba
-- admin   -> teléfono 600000000 / contraseña admin123
-- jugador -> teléfono 611111111 / contraseña 1234
INSERT INTO usuarios (nombre, telefono, password, saldo, rol) VALUES
('Administrador', '600000000', '$2y$10$ILDvwm8eXKxwA96hEF8ipeXowEHJnjw9lCw0KWwQ4GYfC1N.PnG4u', 0, 'admin'),
('Jugador Prueba', '611111111', '$2y$10$AxfJk3ZwbYN.g4MQoWxvhutKefQr6vcu7WJnQHOnSRKKwzJNzJVTK', 100, 'jugador');
