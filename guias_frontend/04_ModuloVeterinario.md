# 🩺 Guía Visual — Módulo 4: Veterinario

> **Ruta del módulo:** `FrontendReact/src/components/ModuloVeterinario/`

---

## 📁 Archivos del módulo

| Subcarpeta | Archivos JSX | Función | Archivos CSS |
|---|---|---|---|
| `Layout/` | `VeterinarioLayout.jsx` | Estructura contenedora del módulo | *(usa clases de NavegacionEstilos.css)* |
| `Navegacion/` | `NavbarVeterinario.jsx`, `SidebarVeterinario.jsx` | Barra superior y menú lateral | `NavegacionEstilos.css` *(compartido)* |
| `DashboardCliente/` | `DashboardVeterinario.jsx`, `CarruselProximosPacientes.jsx`, `ListaCitasPendientes.jsx`, `TarjetasKpi.jsx` | Dashboard principal del veterinario | `DashboardEstilos.css`, `CarruselPacientesEstilos.css`, `CitasPendientesEstilos.css`, `TarjetasKpiEstilos.css` |
| `Agenda/` | `AgendaVeterinario.jsx`, `ConfigurarHorarioModal.jsx`, `FormularioCitaAdminModal.jsx` | Vista de agenda del veterinario | `AgendaEstilos.css`, `ConfigurarHorarioModal.css` |
| `DirectorioClientes/` | `ListaClientes.jsx`, `TarjetaCliente.jsx`, `DetalleClienteModal.jsx` | Directorio de clientes | `ListaClientesEstilos.css`, `TarjetaClienteEstilos.css`, `DetalleClienteModalEstilos.css` |
| `Expedientes/` | `ExpedientesVeterinario.jsx`, `FormularioMascotaAdminModal.jsx` | Gestión de expedientes | `ExpedientesEstilos.css`, `ExpedientesVeterinario.css`, `FormularioMascotaAdminModal.css` |

---

## 📁 Archivos CSS del módulo

| CSS | Ubicación | ¿Qué controla? |
|-----|-----------|----------------|
| `NavegacionEstilos.css` | `ModuloCliente/Navegacion/` | Navbar y Sidebar (compartido con todos los módulos) |
| `DashboardEstilos.css` | `DashboardCliente/` | Layout general del dashboard veterinario |
| `CarruselPacientesEstilos.css` | `DashboardCliente/` | Carrusel de próximos pacientes |
| `CitasPendientesEstilos.css` | `DashboardCliente/` | Lista de citas pendientes |
| `TarjetasKpiEstilos.css` | `DashboardCliente/` | Tarjetas de indicadores (KPIs) |
| `AgendaEstilos.css` | `Agenda/` | Vista de agenda y calendario |
| `ConfigurarHorarioModal.css` | `Agenda/` | Modal para configurar horarios |
| `ListaClientesEstilos.css` | `DirectorioClientes/` | Lista de clientes |
| `TarjetaClienteEstilos.css` | `DirectorioClientes/` | Tarjeta individual de cliente |
| `DetalleClienteModalEstilos.css` | `DirectorioClientes/` | Modal de detalle de cliente |
| `ExpedientesEstilos.css` | `Expedientes/` | Vista principal de expedientes |
| `ExpedientesVeterinario.css` | `Expedientes/` | Estilos adicionales del componente |
| `FormularioMascotaAdminModal.css` | `Expedientes/` | Modal de formulario de mascota |

---

## 📄 NavbarVeterinario.jsx — Barra de Navegación Superior

**Archivo:** `FrontendReact/src/components/ModuloVeterinario/Navegacion/NavbarVeterinario.jsx`  
**CSS:** `FrontendReact/src/components/ModuloCliente/Navegacion/NavegacionEstilos.css`

> ⚠️ Usa el mismo CSS que el módulo cliente. Cualquier cambio aquí afectará también la navbar del cliente y el admin.

### ¿Dónde cambiar aspectos visuales?

| Clase en JSX | Elemento visual |
|--------------|----------------|
| `navbar-cliente` | Barra superior completa |
| `navbar-spacer` | Espacio separador izquierdo |
| `navbar-user-section` | Sección derecha con usuario |
| `user-pill` | Píldora/botón del usuario |
| `user-avatar` / `avatar-placeholder` | Avatar circular del usuario |
| `user-name` | Nombre del veterinario en la barra |
| `dropdown-icon` + `open` | Ícono de flecha (animado) |
| `dropdown-menu` | Menú desplegable |
| `dropdown-item` | Cada opción (Perfil / Cerrar Sesión) |

---

## 📄 SidebarVeterinario.jsx — Menú Lateral

**Archivo:** `FrontendReact/src/components/ModuloVeterinario/Navegacion/SidebarVeterinario.jsx`  
**CSS:** `FrontendReact/src/components/ModuloCliente/Navegacion/NavegacionEstilos.css`

### ¿Dónde cambiar aspectos visuales?

| Clase en JSX | Elemento visual |
|--------------|----------------|
| `sidebar-cliente` | Sidebar completo — ancho, fondo, sombra |
| `sidebar-logo` | Área del logo Mitsu |
| `sidebar-menu` | Contenedor de los ítems del menú |
| `menu-link` | Cada ítem del menú (ícono + texto) |
| `menu-link.active` | Ítem activo/seleccionado |
| `menu-icon` | Ícono dentro de cada ítem |

---

## 📄 DashboardVeterinario.jsx — Dashboard Principal

**Archivo:** `FrontendReact/src/components/ModuloVeterinario/DashboardCliente/DashboardVeterinario.jsx`  
**CSS principal:** `DashboardEstilos.css`

Dashboard que muestra el resumen del veterinario (KPIs, próximos pacientes, citas pendientes).

### Subcomponentes del Dashboard

#### TarjetasKpi.jsx
**CSS:** `TarjetasKpiEstilos.css`

Muestra tarjetas con indicadores numéricos (total de citas, pacientes del día, etc.).

| Elemento visual | Qué buscar |
|----------------|------------|
| Tarjeta KPI | Clase contenedora de la tarjeta |
| Número/valor principal | Clase del número destacado |
| Etiqueta descriptiva | Clase del texto de la tarjeta |
| Color/ícono de la tarjeta | Clases de color o variantes |

#### CarruselProximosPacientes.jsx
**CSS:** `CarruselPacientesEstilos.css`

Muestra un carrusel horizontal con los próximos pacientes del día.

| Elemento visual | Qué buscar |
|----------------|------------|
| Contenedor del carrusel | Clase del carrusel principal |
| Tarjeta de cada paciente | Clase de tarjeta en el carrusel |
| Flechas de navegación | Clases de los botones prev/next |

#### ListaCitasPendientes.jsx
**CSS:** `CitasPendientesEstilos.css`

Lista de citas pendientes de atender.

| Elemento visual | Qué buscar |
|----------------|------------|
| Contenedor de la lista | Clase de la lista de citas |
| Cada ítem de cita | Clase de fila/ítem de cita |
| Badge de estado | Clases tipo `estado-pendiente`, `badge` |

---

## 📄 AgendaVeterinario.jsx — Vista de Agenda

**Archivo:** `FrontendReact/src/components/ModuloVeterinario/Agenda/AgendaVeterinario.jsx`  
**CSS:** `AgendaEstilos.css`

Vista principal de la agenda del veterinario. Muestra un calendario con las citas del mes/semana.

> Este es el componente más grande del módulo (18 KB / ~400 líneas). Los cambios visuales principales están en el `return()`.

### ¿Dónde cambiar aspectos visuales?

| Elemento visual | CSS |
|----------------|-----|
| Encabezado de la agenda | `AgendaEstilos.css` |
| Grid del calendario (días de la semana) | `AgendaEstilos.css` |
| Celdas del calendario | `AgendaEstilos.css` |
| Tarjetas de citas dentro del calendario | `AgendaEstilos.css` |
| Botón "Configurar Horario" | `AgendaEstilos.css` |
| Navegación entre semanas/meses | `AgendaEstilos.css` |

#### ConfigurarHorarioModal.jsx
**CSS:** `ConfigurarHorarioModal.css`

Modal para que el veterinario configure su disponibilidad horaria.

#### FormularioCitaAdminModal.jsx
Modal para crear o editar una cita directamente desde la agenda.  
*(No tiene su propio CSS — usa estilos inline o de AgendaEstilos.css)*

---

## 📄 Módulo: Directorio de Clientes

### ListaClientes.jsx
**Archivo:** `FrontendReact/src/components/ModuloVeterinario/DirectorioClientes/ListaClientes.jsx`  
**CSS:** `ListaClientesEstilos.css`

Vista de la lista de clientes registrados en el sistema.

### TarjetaCliente.jsx
**Archivo:** `FrontendReact/src/components/ModuloVeterinario/DirectorioClientes/TarjetaCliente.jsx`  
**CSS:** `TarjetaClienteEstilos.css`

Tarjeta individual de cada cliente con su información básica.

### DetalleClienteModal.jsx
**Archivo:** `FrontendReact/src/components/ModuloVeterinario/DirectorioClientes/DetalleClienteModal.jsx`  
**CSS:** `DetalleClienteModalEstilos.css`

Modal que muestra el detalle completo de un cliente (datos + mascotas).

---

## 📄 Módulo: Expedientes

### ExpedientesVeterinario.jsx
**Archivo:** `FrontendReact/src/components/ModuloVeterinario/Expedientes/ExpedientesVeterinario.jsx`  
**CSS:** `ExpedientesEstilos.css` + `ExpedientesVeterinario.css`

Vista principal de expedientes de mascotas. El veterinario puede revisar el historial médico completo.

### FormularioMascotaAdminModal.jsx
**Archivo:** `FrontendReact/src/components/ModuloVeterinario/Expedientes/FormularioMascotaAdminModal.jsx`  
**CSS:** `FormularioMascotaAdminModal.css`

Modal para editar la información de una mascota desde el módulo veterinario.

---

## 🔑 Resumen de CSS por sección

| Sección | Archivo CSS |
|---------|-------------|
| Navbar y Sidebar | `ModuloCliente/Navegacion/NavegacionEstilos.css` |
| Dashboard — layout general | `DashboardCliente/DashboardEstilos.css` |
| Dashboard — KPIs | `DashboardCliente/TarjetasKpiEstilos.css` |
| Dashboard — carrusel pacientes | `DashboardCliente/CarruselPacientesEstilos.css` |
| Dashboard — citas pendientes | `DashboardCliente/CitasPendientesEstilos.css` |
| Agenda/calendario | `Agenda/AgendaEstilos.css` |
| Modal configurar horario | `Agenda/ConfigurarHorarioModal.css` |
| Lista de clientes | `DirectorioClientes/ListaClientesEstilos.css` |
| Tarjeta de cliente | `DirectorioClientes/TarjetaClienteEstilos.css` |
| Modal detalle de cliente | `DirectorioClientes/DetalleClienteModalEstilos.css` |
| Expedientes — vista principal | `Expedientes/ExpedientesEstilos.css` |
| Expedientes — estilos adicionales | `Expedientes/ExpedientesVeterinario.css` |
| Expedientes — modal de mascota | `Expedientes/FormularioMascotaAdminModal.css` |
