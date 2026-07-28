-- V3__alter_imagen_column.sql
-- Modificar el tipo de columna imagen de VARCHAR(255) a LONGTEXT para permitir imágenes en formato Base64 o URLs largas
ALTER TABLE MASCOTA MODIFY COLUMN imagen LONGTEXT;
