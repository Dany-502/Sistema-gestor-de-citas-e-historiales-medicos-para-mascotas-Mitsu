Indicaciones para Fronted
Consumo de la API mediante Axios o Fetch, enviando el token JWT en el header de cada petición protegida. 
Rutas protegidas según el rol del usuario autenticado. 
Validaciones visibles debajo de cada input, no mediante alert ni window.confirm. El mensaje de error debe aparecer bajo el campo correspondiente, tanto en tiempo real como al intentar enviar el formulario. 
Diseño responsivo: debe funcionar correctamente en mobile y desktop. 
Loading states visibles mientras se esperan respuestas de la API. 
Manejo de errores de red (mensajes claros cuando algo falla). 
Tablas de listados con paginación real del lado del servidor. No se acepta cargar todos los registros de golpe y paginar o filtrar en el cliente. Filtros de búsqueda enviados a la API como parámetros. El backend recibe el filtro y regresa únicamente los registros que corresponden. 
Navbar visible en toda la parte interna de la aplicación, con los datos del usuario autenticado: nombre, correo, imagen de perfil o avatar por defecto, y acceso al perfil o para cerrar sesión. 
Modales de confirmación para acciones destructivas o pasos importantes. 
Nunca usar alert() ni confirm() nativos del navegador.