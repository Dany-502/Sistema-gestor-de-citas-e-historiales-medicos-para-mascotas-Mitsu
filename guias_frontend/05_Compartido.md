# 🌐 Guía Visual — Módulo 5: Compartido (Perfil de Usuario)

> **Ruta del módulo:** `FrontendReact/src/components/Compartido/`

---

## 📁 Archivos del módulo

| Subcarpeta | Archivos JSX | Función | Archivo CSS |
|---|---|---|---|
| `PerfilUsuario/` | `PerfilUsuario.jsx` | Pantalla de perfil — accesible desde cualquier módulo | `PerfilUsuarioEstilos.css` |

---

## 📁 Archivos CSS del módulo

| CSS | Ubicación | ¿Qué controla? |
|-----|-----------|----------------|
| `PerfilUsuarioEstilos.css` | `Compartido/PerfilUsuario/` | Toda la vista de perfil de usuario |

---

## 📄 PerfilUsuario.jsx — Vista de Perfil

**Archivo:** `FrontendReact/src/components/Compartido/PerfilUsuario/PerfilUsuario.jsx`  
**CSS:** `FrontendReact/src/components/Compartido/PerfilUsuario/PerfilUsuarioEstilos.css`

Este componente es **compartido entre todos los roles** (Admin, Cliente y Veterinario). Se accede desde el menú desplegable del usuario en la navbar, a través de la opción "Perfil".

### ¿Dónde cambiar aspectos visuales?

Los elementos visuales se encuentran en el bloque `return()` del componente (aproximadamente desde la línea 100 en adelante). Busca las clases CSS en el JSX:

| Elemento visual | Qué buscar en el JSX | Clase CSS probable |
|----------------|----------------------|-------------------|
| **Contenedor de la página** | Div más externo del `return()` | Clase del contenedor principal |
| **Tarjeta/card del perfil** | Div que agrupa toda la información | Clase tipo `tarjeta-perfil` o `card` |
| **Avatar / foto de perfil** | `<img>` o div circular con inicial | Clase del avatar |
| **Nombre y rol del usuario** | Texto bajo el avatar | Clases del nombre y badge de rol |
| **Sección de información personal** | Bloque con campos (correo, teléfono, etc.) | Clase de la sección de datos |
| **Campos de información** | Pares etiqueta-valor | Clases de cada campo |
| **Botón "Editar perfil"** | `<button>` de acción | Clase del botón de edición |
| **Formulario de edición** | Inputs visibles al editar | Clases de inputs en modo edición |
| **Botones "Guardar" / "Cancelar"** | Botones del formulario de edición | Clases de botones de acción |

---

## 🔑 Clases CSS en `PerfilUsuarioEstilos.css`

> Abre el archivo CSS directamente para ver todas las clases disponibles:  
> `FrontendReact/src/components/Compartido/PerfilUsuario/PerfilUsuarioEstilos.css`

Las clases de este módulo son exclusivas — no se comparten con otros módulos, por lo que cualquier cambio en `PerfilUsuarioEstilos.css` **solo afectará la pantalla de perfil**.

---

## 🔗 Acceso desde cada módulo

La pantalla de perfil se accede navegando a:

| Rol | Ruta URL | Desde |
|-----|----------|-------|
| Administrador | `/admin/perfil` | Menú dropdown del navbar |
| Cliente | `/cliente/perfil` | Menú dropdown del navbar |
| Veterinario | `/veterinario/perfil` | Menú dropdown del navbar |

---

## 📂 Estilos globales que afectan a todos los módulos

Además de los CSS específicos de cada módulo, existen **dos archivos de estilos globales** que pueden afectar la apariencia de toda la aplicación:

### `src/index.css`
**Ruta:** `FrontendReact/src/index.css`

Estilos base globales aplicados a toda la aplicación (reset, variables CSS, tipografía base).

### `src/App.css`
**Ruta:** `FrontendReact/src/App.css`

Estilos del componente raíz `App.jsx`. Afecta el contenedor principal de la aplicación.

> 💡 **Tip:** Si la profesora pide cambiar algo que aparece en **todas las pantallas** (como la fuente, el color de fondo del body, o los márgenes globales), el archivo a modificar es `src/index.css`.
