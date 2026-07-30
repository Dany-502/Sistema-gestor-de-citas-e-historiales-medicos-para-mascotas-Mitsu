# 👤 Guía Visual — Módulo 3: Cliente

> **Ruta del módulo:** `FrontendReact/src/components/ModuloCliente/`

---

## 📁 Archivos del módulo

| Subcarpeta | Archivos JSX | Función | Archivos CSS |
|---|---|---|---|
| `Layout/` | `ClienteLayout.jsx` | Estructura contenedora del módulo | *(usa clases de NavegacionEstilos.css)* |
| `Navegacion/` | `Navbar.jsx`, `Sidebar.jsx` | Barra superior y menú lateral | `NavegacionEstilos.css` |
| `Dashboard/` | `contenedorPrincipal.jsx` | Dashboard principal del cliente | `DashboardEstilos.css`, `ClinicaEstilos.css`, `MascotasEstilos.css` |
| `MisMascotas/` | `ListaMascotas.jsx`, `TarjetaMascota.jsx`, `CarnetMascotaModal.jsx`, `FormularioMascotaModal.jsx`, `CarnetHistorialCitas.jsx`, `CarnetHistorialVacunas.jsx`, `CarnetInformacionGeneral.jsx` | Vista de mascotas del cliente | `ListaMascotasEstilos.css`, `TarjetaMascotaEstilos.css`, `CarnetMascotaEstilos.css`, `FormularioMascotaModalEstilos.css` |
| `MisCitas/` | `MisCitas.jsx`, `FormularioNuevaCitaModal.jsx`, `ResumenCitaModal.jsx` | Vista de citas del cliente | `MisCitasEstilos.css`, `FormularioNuevaCitaModalEstilos.css`, `ResumenCitaModalEstilos.css` |
| `DirectorioMedicos/` | `ListaMedicos.jsx`, `TarjetaMedico.jsx`, `FormularioMedicoAdminModal.jsx` | Directorio de veterinarios | `ListaMedicosEstilos.css`, `TarjetaMedicoEstilos.css`, `FormularioMedicoAdminModal.css` |

---

## 📄 Navbar.jsx — Barra de Navegación Superior (Cliente)

**Archivo:** `FrontendReact/src/components/ModuloCliente/Navegacion/Navbar.jsx`  
**CSS:** `FrontendReact/src/components/ModuloCliente/Navegacion/NavegacionEstilos.css`

### ¿Dónde cambiar aspectos visuales?

| Clase en JSX | Elemento visual |
|--------------|----------------|
| `navbar-cliente` | Barra superior completa — fondo, altura, sombra |
| `navbar-spacer` | Espacio vacío para alinear con el sidebar |
| `navbar-user-section` | Sección derecha con info del usuario |
| `user-pill` | Botón del usuario (avatar + nombre + flecha) |
| `user-avatar` / `avatar-placeholder` | Círculo de avatar |
| `user-name` | Nombre del usuario visible en la barra |
| `dropdown-icon` + `open` | Ícono de flecha con animación al abrir |
| `dropdown-menu` | Menú desplegable |
| `dropdown-item` | Cada opción del menú (Perfil / Cerrar Sesión) |

---

## 📄 Sidebar.jsx — Menú Lateral (Cliente)

**Archivo:** `FrontendReact/src/components/ModuloCliente/Navegacion/Sidebar.jsx`  
**CSS:** `FrontendReact/src/components/ModuloCliente/Navegacion/NavegacionEstilos.css`

### ¿Dónde cambiar aspectos visuales?

| Clase en JSX | Elemento visual |
|--------------|----------------|
| `sidebar-cliente` | Sidebar completo — ancho, color de fondo |
| `sidebar-logo` | Área del logo Mitsu en la parte superior |
| `sidebar-menu` | Contenedor de los ítems del menú |
| `menu-link` | Cada ítem (ícono + texto) |
| `menu-link.active` | Estilo del ítem seleccionado actualmente |
| `menu-icon` | Ícono de cada sección del menú |

---

## 📄 contenedorPrincipal.jsx — Dashboard del Cliente

**Archivo:** `FrontendReact/src/components/ModuloCliente/Dashboard/contenedorPrincipal.jsx`

Este componente es el **dashboard principal** del cliente. Muestra un resumen de mascotas, citas y clínica.

### CSS que utiliza

| CSS | ¿Para qué sección? |
|-----|--------------------|
| `DashboardEstilos.css` | Layout general del dashboard, tarjetas de resumen |
| `ClinicaEstilos.css` | Sección de información de la clínica |
| `MascotasEstilos.css` | Sección de mascotas en el dashboard |

### ¿Dónde cambiar aspectos visuales?

Busca el `return()` del componente y localiza las clases CSS en el JSX. Los tres archivos CSS controlan secciones distintas de la misma pantalla.

---

## 📄 Módulo: Mis Mascotas

### ListaMascotas.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisMascotas/ListaMascotas.jsx`  
**CSS:** `ListaMascotasEstilos.css`

| Elemento visual | Qué buscar en JSX |
|----------------|-------------------|
| Encabezado de sección | Título "Mis Mascotas" y botón "+ Agregar" |
| Grid/lista de tarjetas | Contenedor que agrupa las `TarjetaMascota` |
| Barra de búsqueda o filtros | Input de búsqueda si existe |

### TarjetaMascota.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisMascotas/TarjetaMascota.jsx`  
**CSS:** `TarjetaMascotaEstilos.css`

| Elemento visual | Clase CSS |
|----------------|-----------|
| Tarjeta de mascota | Clase contenedora de la tarjeta |
| Foto/avatar de la mascota | Elemento `<img>` o avatar placeholder |
| Nombre de la mascota | Clase de texto del nombre |
| Datos (especie, raza, edad) | Clases de campos informativos |
| Botones de acción (Ver carnet / Editar) | Clases de botones en la tarjeta |

### FormularioMascotaModal.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisMascotas/FormularioMascotaModal.jsx`  
**CSS:** `FormularioMascotaModalEstilos.css`

Modal para **agregar o editar** una mascota. Controla el formulario con campos: nombre, especie, raza, fecha de nacimiento, peso, etc.

### CarnetMascotaModal.jsx + subcomponentes
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisMascotas/CarnetMascotaModal.jsx`  
**CSS:** `CarnetMascotaEstilos.css`

Modal que muestra el **carnet de la mascota** con 3 pestañas:
- `CarnetInformacionGeneral.jsx` — Datos básicos de la mascota
- `CarnetHistorialCitas.jsx` — Historial de citas
- `CarnetHistorialVacunas.jsx` — Registro de vacunas

Todos usan el mismo archivo **`CarnetMascotaEstilos.css`**.

---

## 📄 Módulo: Mis Citas

### MisCitas.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisCitas/MisCitas.jsx`  
**CSS:** `MisCitasEstilos.css`

Vista principal de citas del cliente. Muestra la lista de citas programadas, pasadas y pendientes.

| Elemento visual | Qué buscar |
|----------------|------------|
| Encabezado con botón "Nueva Cita" | Parte superior del `return()` |
| Tarjetas/lista de citas | Contenedor principal de citas |
| Estado de la cita (badge) | Clases tipo `estado-`, `badge-` |
| Botones de acción (Ver / Cancelar) | Botones dentro de cada cita |

### FormularioNuevaCitaModal.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisCitas/FormularioNuevaCitaModal.jsx`  
**CSS:** `FormularioNuevaCitaModalEstilos.css`

Modal para **agendar una nueva cita**. Incluye selección de mascota, veterinario, fecha y hora.

### ResumenCitaModal.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/MisCitas/ResumenCitaModal.jsx`  
**CSS:** `ResumenCitaModalEstilos.css`

Modal que muestra el **resumen/detalle de una cita** seleccionada.

---

## 📄 Módulo: Directorio de Médicos

### ListaMedicos.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/DirectorioMedicos/ListaMedicos.jsx`  
**CSS:** `ListaMedicosEstilos.css`

Lista de veterinarios disponibles con barra de búsqueda.

### TarjetaMedico.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/DirectorioMedicos/TarjetaMedico.jsx`  
**CSS:** `TarjetaMedicoEstilos.css`

Tarjeta individual de cada médico veterinario. Controla la foto, nombre, especialidad y horarios.

### FormularioMedicoAdminModal.jsx
**Archivo:** `FrontendReact/src/components/ModuloCliente/DirectorioMedicos/FormularioMedicoAdminModal.jsx`  
**CSS:** `FormularioMedicoAdminModal.css`

Modal para editar o agregar un médico (accesible desde el directorio).

---

## 🔑 Resumen de CSS por sección

| Sección | Archivo CSS |
|---------|-------------|
| Navbar y Sidebar | `Navegacion/NavegacionEstilos.css` |
| Dashboard principal | `Dashboard/DashboardEstilos.css` |
| Info clínica en dashboard | `Dashboard/ClinicaEstilos.css` |
| Mascotas en dashboard | `Dashboard/MascotasEstilos.css` |
| Lista de mascotas | `MisMascotas/ListaMascotasEstilos.css` |
| Tarjeta individual de mascota | `MisMascotas/TarjetaMascotaEstilos.css` |
| Carnet de mascota (modal) | `MisMascotas/CarnetMascotaEstilos.css` |
| Formulario agregar/editar mascota | `MisMascotas/FormularioMascotaModalEstilos.css` |
| Vista de mis citas | `MisCitas/MisCitasEstilos.css` |
| Modal nueva cita | `MisCitas/FormularioNuevaCitaModalEstilos.css` |
| Modal resumen de cita | `MisCitas/ResumenCitaModalEstilos.css` |
| Lista de médicos | `DirectorioMedicos/ListaMedicosEstilos.css` |
| Tarjeta de médico | `DirectorioMedicos/TarjetaMedicoEstilos.css` |
| Modal médico (admin) | `DirectorioMedicos/FormularioMedicoAdminModal.css` |
