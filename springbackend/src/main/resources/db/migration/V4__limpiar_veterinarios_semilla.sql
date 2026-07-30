-- =============================================================
-- V4__limpiar_veterinarios_semilla.sql
-- Limpieza de los veterinarios y citas de demostración iniciales
-- para iniciar con un catálogo limpio en producción.
-- =============================================================

DELETE FROM HISTORIAL_CLINICO WHERE id_cita IN (SELECT id_Cita FROM CITA WHERE id_Veterinario BETWEEN 1 AND 10);
DELETE FROM CITA WHERE id_Veterinario BETWEEN 1 AND 10;
DELETE FROM HORARIO_VETERINARIO WHERE id_Veterinario BETWEEN 1 AND 10;
DELETE FROM VETERINARIO WHERE id_Veterinario BETWEEN 1 AND 10;
