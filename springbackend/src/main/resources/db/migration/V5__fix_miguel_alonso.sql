-- =============================================================
-- V5__fix_miguel_alonso.sql
-- Fixes the duplicate name for Miguel Alonso which was incorrectly
-- recorded as Blanca Jimenez.
-- =============================================================

UPDATE VETERINARIO 
SET Nombre = 'Miguel Alberto', ApPaterno = 'Alonso', ApMaterno = 'Heredia' 
WHERE Correo_Electronico = 'miguelalbertoalonsoheredia@gmail.com';
