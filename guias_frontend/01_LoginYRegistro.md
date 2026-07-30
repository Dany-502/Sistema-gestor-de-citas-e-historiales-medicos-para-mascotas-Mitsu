# 🔐 Guía Visual — Módulo 1: Login y Registro

> **Ruta del módulo:** `FrontendReact/src/components/LoginYRegistro/`

---

## 📁 Archivos del módulo

| Archivo JSX | Función | Archivo CSS |
|---|---|---|
| `ContenedorPadre.jsx` | Estructura general de la pantalla (fondo, tarjeta, título) | `AuthEstilos.css` |
| `FormularioLogin.jsx` | Formulario de inicio de sesión | `AuthEstilos.css` |
| `RegistroLogin.jsx` | Formulario de registro de cliente | `AuthEstilos.css` |

---

## 🎨 CSS principal

```
FrontendReact/src/components/LoginYRegistro/AuthEstilos.css
```

Todos los componentes de este módulo comparten **un único archivo CSS**: `AuthEstilos.css`.

---

## 📄 ContenedorPadre.jsx — Pantalla principal

**Archivo:** `FrontendReact/src/components/LoginYRegistro/ContenedorPadre.jsx`

Este componente es la "capa exterior" que se ve al entrar al sistema. Controla:
- El fondo de pantalla completa
- La tarjeta blanca central donde aparece el formulario
- El título de la pantalla ("Iniciar Sesión" / "Registro de Cliente")

### ¿Dónde cambiar aspectos visuales?

| Línea | Elemento visual | Clase CSS / Atributo |
|-------|----------------|----------------------|
| **12** | **Fondo de pantalla** — imagen de fondo, posición de la tarjeta | `contenedorPrincipal` / `registroCentrado` (inline `backgroundImage`) |
| **13** | **Tarjeta central** — borde, sombra, tamaño, animación de aparición | `tarjetaAutenticacion animacionAparicion` |
| **16–20** | **Encabezado / Título** — tipografía, color, alineación del título | `encabezadoTitulo` / `tituloAutenticacion` |
| **23** | **Cuerpo de la tarjeta** — padding interno, separación del contenido | `cuerpoAutenticacion` |

> 💡 **Para cambiar la imagen de fondo:** La imagen viene de `src/assets/imagenes/fondo-login.png`. Puedes cambiarla en la línea 6 (importación) y línea 12 (uso como `backgroundImage`).

---

## 📄 FormularioLogin.jsx — Formulario de Inicio de Sesión

**Archivo:** `FrontendReact/src/components/LoginYRegistro/FormularioLogin.jsx`

Controla el formulario que aparece al iniciar sesión.

### ¿Dónde cambiar aspectos visuales?

| Línea | Elemento visual | Clase CSS / Atributo |
|-------|----------------|----------------------|
| **150–153** | **Caja de error global** — color de fondo, borde, texto de alerta | `mensajeErrorGlobal` |
| **155–167** | **Campo: Correo electrónico** — etiqueta + input + mensaje de error | `grupoEntrada` / `etiquetaCampo` / `campoTexto` / `campoConError` / `textoError` |
| **169–189** | **Campo: Contraseña** — incluyendo el ícono de ojo | `grupoEntrada` / `contenedorInputRelativo` / `iconoOjo` |
| **172** | **Enlace "¿Olvidaste la contraseña?"** — color, tamaño, posición | `enlaceOlvido` |
| **191–198** | **Botón "Acceder"** — color, tamaño, forma, texto | `botonAccion botonAcceder` |
| **195** | **Opacidad del botón al cargar** — efecto de carga | `style={{ opacity, cursor }}` (inline) |
| **200–205** | **Pie de formulario** — texto y enlace para crear cuenta | `textoPie` / `enlaceCrearCuenta` |

---

## 📄 RegistroLogin.jsx — Formulario de Registro

**Archivo:** `FrontendReact/src/components/LoginYRegistro/RegistroLogin.jsx`

Controla el formulario que aparece cuando un nuevo cliente se registra.

### ¿Dónde cambiar aspectos visuales?

| Línea | Elemento visual | Clase CSS / Atributo |
|-------|----------------|----------------------|
| **97–101** | **Caja de error global** | `mensajeErrorGlobal` |
| **103–114** | **Campo: Nombre** | `grupoEntrada` / `etiquetaCampo` / `campoTexto` |
| **116–141** | **Fila de apellidos** (en dos columnas) — layout horizontal | `style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}` (inline) |
| **143–167** | **Campos: Dirección y Teléfono** | `grupoEntrada` / `campoTexto` |
| **169–180** | **Campo: Correo Electrónico** | `grupoEntrada` / `campoTexto` |
| **182–198** | **Campo: Contraseña** + ícono ojo | `grupoEntrada` / `contenedorInputRelativo` / `iconoOjo` |
| **200–218** | **Botones "Cancelar" y "Guardar"** — diseño del par de botones | `contenedorBotonesRegistro` / `botonAccion botonCancelar` / `botonAccion botonGuardar` |

---

## 🔑 Clases CSS clave en `AuthEstilos.css`

| Clase CSS | ¿Qué controla? |
|-----------|----------------|
| `.contenedorPrincipal` | Pantalla completa con imagen de fondo |
| `.tarjetaAutenticacion` | Tarjeta blanca central del formulario |
| `.animacionAparicion` | Animación de entrada de la tarjeta |
| `.tituloAutenticacion` | Título "Iniciar Sesión" / "Registro de Cliente" |
| `.grupoEntrada` | Contenedor de cada campo (label + input) |
| `.etiquetaCampo` | Etiquetas de los campos (Correo, Contraseña, etc.) |
| `.campoTexto` | Todos los inputs del formulario |
| `.campoConError` | Estado visual de input con error (borde rojo) |
| `.textoError` | Mensajes de validación debajo del campo |
| `.mensajeErrorGlobal` | Alerta de error de red/servidor |
| `.botonAccion` | Estilo base de todos los botones |
| `.botonAcceder` | Color/forma específicos del botón "Acceder" |
| `.botonGuardar` | Color/forma del botón "Guardar" en registro |
| `.botonCancelar` | Color/forma del botón "Cancelar" |
| `.enlaceOlvido` | Enlace "¿Olvidaste la contraseña?" |
| `.enlaceCrearCuenta` | Enlace "Cree una ahora" |
| `.iconoOjo` | Ícono para mostrar/ocultar contraseña |
| `.contenedorInputRelativo` | Posición relativa para el ícono dentro del input |
