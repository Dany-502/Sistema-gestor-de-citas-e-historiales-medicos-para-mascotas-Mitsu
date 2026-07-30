# Sistema Gestor de Citas e Historiales Médicos para Mascotas - Mitsu

## Integrantes
Equipo 1

- Rodriguez Juárez Jose Daniel
- Alonso Hereida Miguel Alberto

## Descripción del Proyecto
Mitsu es un sistema integral para clínicas veterinarias diseñado para facilitar la administración de citas, el control de historiales médicos de las mascotas y la gestión de clientes, brindando una solución completa para mejorar el flujo de trabajo en la clínica.

## Problematica que resuelve 
El sistema elimina la lentitud en la programación de citas y previene la pérdida de documentos físicos. Su objetivo es automatizar la agenda de la veterinaria y digitalizar los registros médicos de las mascotas, asegurando un acceso rápido y confiable a la información vital.

## Enlaces del Proyecto
- **Figma (Diseños y Prototipos):** [Enlace al diseño en Figma](https://www.figma.com/proto/SoFroXdQ8CH3BGhysbRBs3/Proyecto_Veterinaria?t=ZqjNQS5FGb5akKMS-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=29-2&starting-point-node-id=29%3A2)
- **Proyecto Desplegado:** [Enlace a la aplicación en producción](https://mitsu-veterinaria.duckdns.org/)
- **GitHub Projects (Gestión y Tareas):** [Enlace al tablero de GitHub Projects](https://github.com/users/Dany-502/projects/2/views/1)

## Módulos Principales
- **Gestión de Autenticación y Usuarios:** Autenticación, autorización y manejo de roles (ej. Administrador, Veterinario).
- **Gestión de Pacientes (Mascotas) y Clientes (Dueños):** Registro y control de información de mascotas y dueños.
- **Historiales Médicos:** Registro detallado de consultas, vacunas, diagnósticos, recetas y tratamientos.
- **Gestión de Citas:** Sistema para programar, actualizar y dar seguimiento a las consultas médicas.

## Tecnologías Usadas
- **Frontend:** React, HTML, CSS.
- **Backend:** Java, Spring Boot, Maven.
- **Base de Datos:** MySQL.

## Roles
El sistema está diseñado con un modelo basado en roles, donde cada usuario tiene permisos y funciones específicas:

- **Administrador:**
  - Tiene control total sobre el sistema.
  - Puede gestionar (crear, editar, eliminar) cuentas de otros usuarios y asignar roles.
  - Supervisión general de la clínica, registros de pacientes, clientes y agenda.

- **Veterinario:**
  - Enfocado en la atención médica de las mascotas.
  - Puede visualizar, crear y actualizar los historiales médicos (diagnósticos, tratamientos, vacunas, recetas).
  - Consulta de su propia agenda de citas médicas programadas.

- **Cliente:**
  - Es el dueño de la mascota registrada en la clínica.
  - Puede programar, reprogramar o cancelar citas para sus mascotas.
  - Consulta de la información y el historial básico de sus mascotas.

## Instrucciones de Instalación

### Requisitos Previos
- Node.js (para el frontend en React)
- Java 17+ / Maven (para el backend en Spring Boot)
- MySQL Server

### Configuración y Ejecución Local

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Proyecto_Veterinaria
   ```

2. **Base de Datos:**
   - Crear una base de datos en MySQL.
   - Importar la estructura y datos iniciales ejecutando el archivo `mitsu_db_backup.sql` incluido en la raíz del proyecto.

3. **Ejecutar Backend (Spring Boot):**
   - Navegar a la carpeta del backend y configurar las credenciales de la base de datos en `application.properties` (si aplica).
   ```bash
   cd springbackend
   mvn spring-boot:run
   ```

4. **Ejecutar Frontend (React):**
   - En otra terminal, navega a la carpeta del frontend.
   ```bash
   cd FrontendReact
   npm install
   npm run dev
   ```

## Credenciales de Acceso (Entorno de Pruebas)

- **Administrador:**
  - Correo: `admin@mitsu.com`
  - Contraseña: `123456`

  **Veterinario:**
  - Correo: `dr.Alejandro@mitsu.com`
  - Contraseña: `123456`

  **Cliente:**
  - Correo: `miguel@mitsu.com`
  - Contraseña: `123456`

## Diagrama Entidad-Relación (ER)

![Diagrama ER del Sistema](./FrontendReact/Base%20de%20Datos/Bd_Veterinaria_Mitsu.png)
