-- ===================================================
-- V2__seed_data.sql: Carga de Datos Iniciales (Seeds)
-- Mínimo 10 a 15 registros por tabla principal
-- ===================================================

-- 1. Insertar CLIENTES (12 registros)
-- Hash BCrypt real para la contraseña '123456': $2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a
INSERT INTO CLIENTE (id_Cliente, Nombre, ApPaterno, ApMaterno, Direccion, Telefono, Correo_Electronico, Contrasena) VALUES
(1, 'Miguel', 'Alberto', 'Gomez', 'Av. Insurgentes Sur 123, CDMX', '5512345678', 'miguel@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(2, 'Ana', 'Lopez', 'Martinez', 'Calle Juarez 45, Guadalajara', '3398765432', 'ana.lopez@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(3, 'Carlos', 'Ramirez', 'Hernandez', 'Av. Hidalgo 89, Monterrey', '8112233445', 'carlos.ramirez@hotmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(4, 'Sofia', 'Torres', 'Vazquez', 'Calle 60 #102, Merida', '9991122334', 'sofia.torres@outlook.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(5, 'Roberto', 'Mendoza', 'Sanchez', 'Paseo Reforma 450, CDMX', '5544332211', 'roberto.mendoza@yahoo.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(6, 'Laura', 'Castillo', 'Flores', 'Av. Vallarta 2340, Guadalajara', '3311223344', 'laura.castillo@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(7, 'Javier', 'Morales', 'Ortiz', 'Calzada del Valle 12, Monterrey', '8188776655', 'javi.morales@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(8, 'Patricia', 'Guerrero', 'Rios', 'Calle 5 de Mayo 78, Puebla', '2223344556', 'patty.guerrero@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(9, 'Fernando', 'Nunez', 'Cruz', 'Blvd. Constituyentes 300, Querétaro', '4421122334', 'fer.nunez@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(10, 'Gabriela', 'Reyes', 'Mejia', 'Av. Universidad 500, CDMX', '5566778899', 'gaby.reyes@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(11, 'Diego', 'Aguilar', 'Perez', 'Calle 10 #450, Campeche', '9811234567', 'diego.aguilar@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(12, 'Elena', 'Vargas', 'Silva', 'Av. Juarez 120, Toluca', '7229876543', 'elena.vargas@gmail.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a');

-- 2. Insertar VETERINARIOS (10 registros)
INSERT INTO VETERINARIO (id_Veterinario, Nombre, ApPaterno, ApMaterno, Direccion, Cedula, Especialidad, Telefono, Correo_Electronico, Contrasena) VALUES
(1, 'Dr. Alejandro', 'Fernandez', 'Luna', 'Clínica Centro, CDMX', 'VET-987654', 'Cirugía General', '5599887766', 'dr.alejandro@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(2, 'Dra. Beatriz', 'Jimenez', 'Alvarez', 'Clínica Poniente, CDMX', 'VET-123456', 'Dermatología Canina', '5511223344', 'dra.beatriz@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(3, 'Dr. Daniel', 'Solís', 'Padilla', 'Clínica Norte, Monterrey', 'VET-456789', 'Cardiología', '8187654321', 'dr.daniel@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(4, 'Dra. Carmen', 'Rios', 'Delgado', 'Clínica Sur, Guadalajara', 'VET-654321', 'Medicina Felina', '3334455667', 'dra.carmen@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(5, 'Dr. Eduardo', 'Soto', 'Mora', 'Clínica Oriente, Puebla', 'VET-789012', 'Oftalmología', '2225566778', 'dr.eduardo@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(6, 'Dra. Gloria', 'Navarro', 'Salas', 'Clínica Central, Querétaro', 'VET-345678', 'Odontología Veterinaria', '4429988776', 'dra.gloria@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(7, 'Dr. Hugo', 'Paredes', 'Espinosa', 'Clínica Sur, CDMX', 'VET-901234', 'Traumatología y Ortopedia', '5577665544', 'dr.hugo@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(8, 'Dra. Isabel', 'Cabrera', 'Lara', 'Clínica Norte, Merida', 'VET-567890', 'Nutrición Animal', '9994433221', 'dra.isabel@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(9, 'Dr. Jorge', 'Maldonado', 'Fuentes', 'Clínica Centro, Toluca', 'VET-234567', 'Neurología', '7223344556', 'dr.jorge@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a'),
(10, 'Dra. Maria', 'Valencia', 'Ibarra', 'Clínica Oeste, Guadalajara', 'VET-890123', 'Anestesiología', '3388776655', 'dra.maria@mitsu.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOUVGkqRzgVymGe07xd00DMxs.AQubh4a');

-- 3. Insertar TIPO_SERVICIO (10 registros)
INSERT INTO TIPO_SERVICIO (id_tipo_Servicio, nombreServicio, activo) VALUES
(1, 'Consultas Médicas', TRUE),
(2, 'Vacunación y Desparasitación', TRUE),
(3, 'Estética y Grooming', TRUE),
(4, 'Cirugías y Quirofano', TRUE),
(5, 'Análisis y Laboratorio', TRUE),
(6, 'Ultrasonido y Rayos X', TRUE),
(7, 'Odontología Preventiva', TRUE),
(8, 'Urgencias 24h', TRUE),
(9, 'Hospedaje y Guardería', TRUE),
(10, 'Rehabilitación y Fisioterapia', TRUE);

-- 4. Insertar MASCOTA (12 registros)
INSERT INTO MASCOTA (id_Mascota, id_cliente, NombreMascota, Especie, Raza, FechaNacimiento, Sexo, Color, Peso, descripcion, Alergias, imagen, estado) VALUES
('#SM1200', 1, 'Simitrio', 'Perro', 'Maltes', '2025-01-01', 'Macho', 'Blanco', 4.00, 'Perro muy juguetón y amigable', 'Polen', null, 'Activo'),
('#QT2058', 1, 'Coquito', 'Perro', 'Schnauzer', '2023-05-10', 'Macho', 'Gris y Blanco', 5.50, 'Le gusta correr en el parque', 'Pollo', null, 'Activo'),
('#FRL2003', 1, 'Firulais', 'Perro', 'Labrador', '2024-02-15', 'Macho', 'Dorado', 25.00, 'Muy obediente y guardián', 'Ninguna', null, 'Activo'),
('#LN1029', 2, 'Luna', 'Gato', 'Siamés', '2024-11-20', 'Hembra', 'Crema y Café', 3.20, 'Gata tranquila de casa', 'Ninguna', null, 'Activo'),
('#RC9081', 2, 'Rocco', 'Perro', 'Bulldog Francés', '2022-08-05', 'Macho', 'Atigrado', 12.80, 'Requiere cuidados en piel', 'Polvo', null, 'Activo'),
('#MX4052', 3, 'Max', 'Perro', 'Golden Retriever', '2021-04-12', 'Macho', 'Dorado', 30.00, 'Excelente carácter con niños', 'Ninguna', null, 'Activo'),
('#BE7712', 4, 'Bella', 'Gato', 'Persa', '2023-01-30', 'Hembra', 'Blanco Esponjoso', 4.10, 'Sensible a cambios de alimento', 'Lácteos', null, 'Activo'),
('#TH3340', 5, 'Thor', 'Perro', 'Pastor Alemán', '2022-10-18', 'Macho', 'Negro y Fuego', 34.50, 'Entrenado para obediencia básica', 'Ninguna', null, 'Activo'),
('#CL9011', 6, 'Cleo', 'Gato', 'Angora', '2024-06-01', 'Hembra', 'Gris Plata', 3.00, 'Muy cariñosa', 'Mariscos', null, 'Activo'),
('#BB5566', 7, 'Bambi', 'Perro', 'Chihuahua', '2023-09-12', 'Macho', 'Café Claro', 2.30, 'Muy alerta y juguetón', 'Ninguna', null, 'Activo'),
('#MI8899', 8, 'Michi', 'Gato', 'Mestizo', '2022-03-25', 'Hembra', 'Naranja Tabby', 3.80, 'Gato rescatado muy alegre', 'Ninguna', null, 'Activo'),
('#DU1122', 9, 'Duque', 'Perro', 'Beagle', '2021-12-05', 'Macho', 'Tricolor', 14.20, 'Olfato desarrollado, le encanta rastrear', 'Carne de res', null, 'Activo');

-- 5. Insertar SERVICIO (10 registros)
INSERT INTO SERVICIO (id_servicio, id_tipo_Servicio, nombre_servicio, duracion_tiempo, precio, activo) VALUES
(1, 1, 'Consulta General de Valoración', 30, 450.00, TRUE),
(2, 1, 'Consulta de Especialidad', 45, 750.00, TRUE),
(3, 2, 'Vacunación Antirrábica', 15, 250.00, TRUE),
(4, 2, 'Vacuna Séxtuple Canina', 20, 480.00, TRUE),
(5, 2, 'Desparasitación Interna y Externa', 15, 300.00, TRUE),
(6, 3, 'Baño y Corte de Pelo Completo', 60, 500.00, TRUE),
(7, 3, 'Corte de Uñas y Limpieza de Oídos', 20, 150.00, TRUE),
(8, 4, 'Profilaxis y Limpieza Dental', 90, 1200.00, TRUE),
(9, 4, 'Esterilización Canina / Felina', 120, 1800.00, TRUE),
(10, 5, 'Biometría Hemática Completa', 30, 600.00, TRUE);

-- 6. Insertar HORARIO_VETERINARIO (10 registros)
INSERT INTO HORARIO_VETERINARIO (id_horario, id_Veterinario, dia_semana, hora_inicio, hora_fin, activo) VALUES
(1, 1, 1, '09:00:00', '17:00:00', TRUE),
(2, 1, 2, '09:00:00', '17:00:00', TRUE),
(3, 2, 1, '10:00:00', '18:00:00', TRUE),
(4, 2, 3, '10:00:00', '18:00:00', TRUE),
(5, 3, 2, '08:00:00', '16:00:00', TRUE),
(6, 4, 4, '09:00:00', '15:00:00', TRUE),
(7, 5, 5, '11:00:00', '19:00:00', TRUE),
(8, 6, 3, '09:00:00', '17:00:00', TRUE),
(9, 7, 6, '09:00:00', '14:00:00', TRUE),
(10, 8, 1, '08:00:00', '14:00:00', TRUE);

-- 7. Insertar VACUNAS_MASCOTA (10 registros)
INSERT INTO VACUNAS_MASCOTA (id_aplicacion, id_mascota, nombre_dosis, fecha_aplicacion, fecha_prox_aplicacion, peso_aplicacion) VALUES
(1, '#SM1200', 'Antirrábica Anual', '2025-01-15', '2026-01-15', 3.80),
(2, '#SM1200', 'Desparasitante Canino', '2025-02-01', '2025-08-01', 4.00),
(3, '#QT2058', 'Séxtuple Canina 1er Refuerzo', '2024-06-10', '2025-06-10', 5.20),
(4, '#FRL2003', 'Rabia y Parvovirus', '2024-03-20', '2025-03-20', 24.50),
(5, '#LN1029', 'Triple Felina', '2024-12-01', '2025-12-01', 3.10),
(6, '#RC9081', 'Puppy DP y Rabia', '2023-01-15', '2024-01-15', 12.00),
(7, '#MX4052', 'Polivalente Anual', '2024-05-10', '2025-05-10', 29.80),
(8, '#BE7712', 'Leucemia Felina', '2023-03-12', '2024-03-12', 4.00),
(9, '#TH3340', 'Séxtuple + Rabia', '2023-11-20', '2024-11-20', 33.90),
(10, '#BB5566', 'Antirrábica', '2024-01-05', '2025-01-05', 2.20);

-- 8. Insertar CITA (10 registros)
INSERT INTO CITA (id_Cita, id_Mascota, id_Veterinario, id_servicio, fecha_hora_inicio, fecha_hora_fin, descripcion, estado) VALUES
(1, '#SM1200', 1, 1, '2026-02-10 10:00:00', '2026-02-10 10:30:00', 'Revision general de rutina', 'Completada'),
(2, '#QT2058', 2, 4, '2026-02-12 11:00:00', '2026-02-12 11:30:00', 'Refuerzo de vacuna sextuple', 'Completada'),
(3, '#FRL2003', 3, 6, '2026-02-15 16:00:00', '2026-02-15 17:00:00', 'Servicio de estetica y bano', 'Completada'),
(4, '#LN1029', 4, 1, '2026-03-01 09:30:00', '2026-03-01 10:00:00', 'Chequeo de oídos y garganta', 'Pendiente'),
(5, '#RC9081', 2, 5, '2026-03-05 12:00:00', '2026-03-05 12:30:00', 'Aplicación de antiparasitario externo', 'Pendiente'),
(6, '#MX4052', 1, 8, '2026-03-10 10:00:00', '2026-03-10 11:30:00', 'Profilaxis dental programada', 'Pendiente'),
(7, '#BE7712', 4, 1, '2026-03-12 15:00:00', '2026-03-12 15:30:00', 'Revision de alergia alimentaria', 'Pendiente'),
(8, '#TH3340', 7, 10, '2026-03-15 11:00:00', '2026-03-15 11:30:00', 'Revision traumatologica de cadera', 'Pendiente'),
(9, '#CL9011', 2, 3, '2026-03-18 13:00:00', '2026-03-18 13:30:00', 'Vacunación antirrábica', 'Pendiente'),
(10, '#BB5566', 1, 7, '2026-03-20 16:00:00', '2026-03-20 16:30:00', 'Corte de uñas y aseo general', 'Pendiente');

-- 9. Insertar HISTORIAL_CLINICO (10 registros)
INSERT INTO HISTORIAL_CLINICO (id_historial, id_mascota, id_cita, descripcion_cita, diagnostico) VALUES
(1, '#SM1200', 1, 'Paciente acude a chequeo general. Constantes vitales normales.', 'Mascota sana. Se recomienda mantener dieta balanceada.'),
(2, '#QT2058', 2, 'Aplicacion de vacuna sin complicaciones.', 'Paciente reactivo a vacuna de manera adecuada.'),
(3, '#FRL2003', 3, 'Servicio de baño y corte de pelo finalizado con éxito.', 'Sin lesiones dermatologicas observadas.'),
(4, '#RC9081', 5, 'Control de dermatitis leve en pliegues faciales.', 'Dermatitis por contacto. Se prescribe champú antiséptico.'),
(5, '#MX4052', 6, 'Revision bucal previa a profilaxis.', 'Lieve sarro dental. Apto para limpieza bucal.'),
(6, '#BE7712', 7, 'Gata presenta cuadros diarréicos ocasionales.', 'Probable intolerancia a la proteína de pollo.'),
(7, '#TH3340', 8, 'Evaluación de marcha en miembro posterior derecho.', 'Leve molestia articular por ejercicio intenso.'),
(8, '#LN1029', 4, 'Revisión de oídos por rascado frecuente.', 'Limpio sin ácaros, leve irritación externa.'),
(9, '#CL9011', 9, 'Chequeo de peso y desparasitante.', 'Peso ideal de 3.0 kg. Excelente estado de salud.'),
(10, '#BB5566', 10, 'Corte de uñas e inspección de cojinetes.', 'Cojinetes hidratados y uñas recortadas correctamente.');
