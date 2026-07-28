-- ===================================================
-- V1__init_schema.sql: Creación de tablas de mitsu_db
-- ===================================================

-- Tabla CLIENTE
CREATE TABLE CLIENTE (
    id_Cliente INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ApPaterno VARCHAR(50) NOT NULL,
    ApMaterno VARCHAR(50) NOT NULL,
    Direccion VARCHAR(150) NOT NULL,
    Telefono VARCHAR(15) NOT NULL,
    Correo_Electronico VARCHAR(100) NOT NULL UNIQUE,
    Contrasena VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla VETERINARIO
CREATE TABLE VETERINARIO (
    id_Veterinario INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL,
    ApPaterno VARCHAR(50) NOT NULL,
    ApMaterno VARCHAR(50) NOT NULL,
    Direccion VARCHAR(150),
    Cedula VARCHAR(50),
    Especialidad VARCHAR(100),
    Telefono VARCHAR(15),
    Correo_Electronico VARCHAR(100) UNIQUE,
    Contrasena VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla TIPO_SERVICIO
CREATE TABLE TIPO_SERVICIO (
    id_tipo_Servicio INT AUTO_INCREMENT PRIMARY KEY,
    nombreServicio VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT TRUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla MASCOTA
CREATE TABLE MASCOTA (
    id_Mascota CHAR(18) PRIMARY KEY,
    id_cliente INT NOT NULL,
    NombreMascota VARCHAR(50) NOT NULL,
    Especie VARCHAR(50),
    Raza VARCHAR(50),
    FechaNacimiento DATE,
    Sexo VARCHAR(15),
    Color VARCHAR(30),
    Peso DECIMAL(5,2),
    descripcion TEXT,
    Alergias TEXT,
    imagen VARCHAR(255),
    estado VARCHAR(30) DEFAULT 'Activo',
    FOREIGN KEY (id_cliente) REFERENCES CLIENTE(id_Cliente) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla SERVICIO
CREATE TABLE SERVICIO (
    id_servicio INT AUTO_INCREMENT PRIMARY KEY,
    id_tipo_Servicio INT NOT NULL,
    nombre_servicio VARCHAR(100) NOT NULL,
    duracion_tiempo INT,
    precio DECIMAL(10,2),
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_tipo_Servicio) REFERENCES TIPO_SERVICIO(id_tipo_Servicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla HORARIO_VETERINARIO
CREATE TABLE HORARIO_VETERINARIO (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_Veterinario INT NOT NULL,
    dia_semana INT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_Veterinario) REFERENCES VETERINARIO(id_Veterinario) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla VACUNAS_MASCOTA
CREATE TABLE VACUNAS_MASCOTA (
    id_aplicacion INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota CHAR(18) NOT NULL,
    nombre_dosis VARCHAR(100) NOT NULL,
    fecha_aplicacion DATE NOT NULL,
    fecha_prox_aplicacion DATE,
    peso_aplicacion DECIMAL(5,2),
    FOREIGN KEY (id_mascota) REFERENCES MASCOTA(id_Mascota) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla CITA
CREATE TABLE CITA (
    id_Cita INT AUTO_INCREMENT PRIMARY KEY,
    id_Mascota CHAR(18) NOT NULL,
    id_Veterinario INT NOT NULL,
    id_servicio INT NOT NULL,
    fecha_hora_inicio DATETIME NOT NULL,
    fecha_hora_fin DATETIME NOT NULL,
    descripcion TEXT,
    estado VARCHAR(30) DEFAULT 'Pendiente',
    FOREIGN KEY (id_Mascota) REFERENCES MASCOTA(id_Mascota),
    FOREIGN KEY (id_Veterinario) REFERENCES VETERINARIO(id_Veterinario),
    FOREIGN KEY (id_servicio) REFERENCES SERVICIO(id_servicio)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabla HISTORIAL_CLINICO
CREATE TABLE HISTORIAL_CLINICO (
    id_historial INT AUTO_INCREMENT PRIMARY KEY,
    id_mascota CHAR(18) NOT NULL,
    id_cita INT NOT NULL,
    descripcion_cita TEXT,
    diagnostico TEXT,
    FOREIGN KEY (id_mascota) REFERENCES MASCOTA(id_Mascota),
    FOREIGN KEY (id_cita) REFERENCES CITA(id_Cita)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
