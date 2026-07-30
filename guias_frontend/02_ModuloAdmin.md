# 🛡️ Guía Visual — Módulo 2: Administrador

> **Ruta del módulo:** `FrontendReact/src/components/ModuloAdmin/`

---

## 📁 Archivos del módulo

| Subcarpeta | Archivo JSX | Función | Archivo CSS |
|---|---|---|---|
| `Layout/` | `AdminLayout.jsx` | Estructura contenedora (sidebar + navbar + contenido) | *(usa clases del NavegacionEstilos.css del módulo cliente)* |
| `Navegacion/` | `NavbarAdmin.jsx` | Barra superior con menú de usuario | `NavegacionEstilos.css` *(compartido)* |
| `Navegacion/` | `SidebarAdmin.jsx` | Menú lateral izquierdo con íconos | `NavegacionEstilos.css` *(compartido)* |
| `Usuarios/` | `GestionUsuarios.jsx` | Tabla/lista de usuarios con filtros | `GestionUsuariosEstilos.css` |
| `Usuarios/` | `DetallesUsuarioModal.jsx` | Modal emergente de detalle de usuario | `GestionUsuariosEstilos.css` |

---

## 📁 Archivos CSS del módulo

| CSS | Ubicación | ¿Qué controla? |
|-----|-----------|----------------|
| `NavegacionEstilos.css` | `ModuloCliente/Navegacion/` | Navbar y Sidebar (compartido con Admin) |
| `GestionUsuariosEstilos.css` | `ModuloAdmin/Usuarios/` | Tabla de usuarios, filtros, modal de detalles |

> ⚠️ **Importante:** El navbar y sidebar del administrador **reutilizan el CSS del módulo cliente**. El archivo a editar es `ModuloCliente/Navegacion/NavegacionEstilos.css`.

---

## 📄 NavbarAdmin.jsx — Barra de Navegación Superior

**Archivo:** `FrontendReact/src/components/ModuloAdmin/Navegacion/NavbarAdmin.jsx`

### ¿Dónde cambiar aspectos visuales?

| Línea | Elemento visual | Clase CSS |
|-------|----------------|-----------|
| **21** | **Barra superior completa** — altura, color de fondo, sombra | `navbar-cliente` |
| **22** | **Espacio vacío a la izquierda** (para alinear con el sidebar) | `navbar-spacer` |
| **24** | **Sección del usuario** (derecha de la barra) | `navbar-user-section` |
| **25** | **Botón/píldora del usuario** — borde, fondo, esquinas | `user-pill` |
| **26–33** | **Avatar del usuario** — círculo con ícono de persona | `user-avatar` / `avatar-placeholder` |
| **34** | **Nombre del usuario** en la navbar | `user-name` |
| **35** | **Ícono de flecha** del dropdown | `dropdown-icon` / `open` |
| **39–43** | **Menú desplegable** — fondo, sombra, bordes | `dropdown-menu` |
| **40–41** | **Opciones del dropdown** (Perfil / Cerrar Sesión) | `dropdown-item` |

**CSS:** `FrontendReact/src/components/ModuloCliente/Navegacion/NavegacionEstilos.css`

---

## 📄 SidebarAdmin.jsx — Menú Lateral

**Archivo:** `FrontendReact/src/components/ModuloAdmin/Navegacion/SidebarAdmin.jsx`

### ¿Dónde cambiar aspectos visuales?

| Línea | Elemento visual | Clase CSS |
|-------|----------------|-----------|
| **12** | **Sidebar completo** — ancho, color de fondo, sombra lateral | `sidebar-cliente` |
| **13–15** | **Área del logo** en la parte superior | `sidebar-logo` |
| **17** | **Contenedor del menú** — separación entre ítems | `sidebar-menu` |
| **18–24** | **Ítem: Gestión Usuarios** — ícono + texto + estado activo | `menu-link` / `active` |
| **25–31** | **Ítem: Agenda Global** | `menu-link` / `active` |
| **32–38** | **Ítem: Expedientes Totales** | `menu-link` / `active` |
| **39–45** | **Ítem: Gestión Médicos** | `menu-link` / `active` |
| **22, 29, 36, 43** | **Ícono de cada ítem del menú** — tamaño, margen | `menu-icon` |

**CSS:** `FrontendReact/src/components/ModuloCliente/Navegacion/NavegacionEstilos.css`

---

## 📄 GestionUsuarios.jsx — Tabla de Gestión de Usuarios

**Archivo:** `FrontendReact/src/components/ModuloAdmin/Usuarios/GestionUsuarios.jsx`

Este es el componente principal de la vista del admin. Muestra la tabla de usuarios con búsqueda, filtros y paginación.

### ¿Dónde cambiar aspectos visuales?

> Los elementos visuales están en el `return()` del componente, desde la línea ~130 hasta el final.

| Sección | Elemento visual | Clase CSS |
|---------|----------------|-----------|
| Encabezado | **Título "Gestión de Usuarios"** | Buscar `.titulo` o encabezado en `GestionUsuariosEstilos.css` |
| Barra de herramientas | **Input de búsqueda** y **select de filtro por rol** | Clases del contenedor de filtros |
| Tabla | **Cabecera de la tabla** (columnas: Nombre, Correo, Rol, Fecha, Acciones) | Estilos `table`, `thead`, `th` en CSS |
| Tabla | **Filas de usuarios** — color alternado, hover | Estilos `tr`, `td` en CSS |
| Tabla | **Botón ícono "Ver detalles"** (ojo) | Clase del botón de acción |
| Tabla | **Botón ícono "Eliminar"** (basura) | Clase del botón de acción |
| Paginación | **Botones de paginación** — anterior/siguiente | Clases de paginación en CSS |

**CSS:** `FrontendReact/src/components/ModuloAdmin/Usuarios/GestionUsuariosEstilos.css`

---

## 📄 DetallesUsuarioModal.jsx — Modal de Detalles

**Archivo:** `FrontendReact/src/components/ModuloAdmin/Usuarios/DetallesUsuarioModal.jsx`

Modal que se abre al hacer clic en el ícono de ojo de un usuario.

### ¿Dónde cambiar aspectos visuales?

| Elemento visual | Clase CSS |
|----------------|-----------|
| **Fondo oscuro** detrás del modal (overlay) | Clase tipo `modal-overlay` o similar en `GestionUsuariosEstilos.css` |
| **Contenedor del modal** — tamaño, bordes redondeados, sombra | Clase tipo `modal-contenedor` en CSS |
| **Cabecera del modal** — título + botón de cierre (X) | Clase tipo `modal-cabecera` en CSS |
| **Cuerpo del modal** — información del usuario (nombre, rol, etc.) | Clase tipo `modal-cuerpo` en CSS |
| **Etiquetas e información** dentro del modal | Clases de campos en CSS |

**CSS:** `FrontendReact/src/components/ModuloAdmin/Usuarios/GestionUsuariosEstilos.css`

---

## 🔑 Clases CSS clave

### `NavegacionEstilos.css` (compartido Admin + Cliente)
| Clase | ¿Qué controla? |
|-------|----------------|
| `.navbar-cliente` | Barra superior completa |
| `.sidebar-cliente` | Menú lateral completo |
| `.sidebar-logo` | Área del logo Mitsu |
| `.sidebar-menu` | Lista de ítems del menú |
| `.menu-link` | Cada ítem del menú (con ícono) |
| `.menu-link.active` | Ítem seleccionado actualmente |
| `.menu-icon` | Ícono de cada ítem del menú |
| `.user-pill` | Botón de usuario en navbar |
| `.user-avatar` | Círculo de avatar del usuario |
| `.dropdown-menu` | Menú desplegable de opciones |
| `.dropdown-item` | Cada opción dentro del dropdown |

### `GestionUsuariosEstilos.css`
| Clase | ¿Qué controla? |
|-------|----------------|
| *(Ver directamente el archivo CSS)* | Tabla, filtros, modal de detalles |
