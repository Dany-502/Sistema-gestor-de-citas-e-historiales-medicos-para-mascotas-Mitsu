# 📚 Índice de Guías de Estilos — Frontend Mitsu Veterinaria

Esta carpeta contiene una guía visual por cada módulo del sistema. Cada guía explica:
- **Qué archivo JSX** controla la interfaz
- **En qué líneas** del JSX encontrar clases CSS o estilos inline
- **Qué archivo CSS** corresponde a ese componente

---

## 🗂️ Módulos disponibles

| # | Módulo | Guía |
|---|--------|------|
| 1 | Login y Registro | [01_LoginYRegistro.md](./01_LoginYRegistro.md) |
| 2 | Módulo Administrador | [02_ModuloAdmin.md](./02_ModuloAdmin.md) |
| 3 | Módulo Cliente | [03_ModuloCliente.md](./03_ModuloCliente.md) |
| 4 | Módulo Veterinario | [04_ModuloVeterinario.md](./04_ModuloVeterinario.md) |
| 5 | Compartido (Perfil Usuario) | [05_Compartido.md](./05_Compartido.md) |

---

## 📁 Estructura general del frontend

```
FrontendReact/src/
├── index.css                    ← Estilos globales de la app
├── App.css                      ← Estilos del componente raíz
├── App.jsx                      ← Rutas principales y layout raíz
└── components/
    ├── LoginYRegistro/          → Módulo 1
    ├── ModuloAdmin/             → Módulo 2
    ├── ModuloCliente/           → Módulo 3
    ├── ModuloVeterinario/       → Módulo 4
    └── Compartido/              → Módulo 5
```

> **Tip:** Para cambios globales (fuentes, colores base, fondo general), revisa primero `src/index.css`.
