BACKEND (SPRING BOOT)
API RESTful con controladores anotados con @RestController y rutas organizadas con @RequestMapping. 
Autenticación con Spring Security + JWT: login, registro, logout e invalidación de token, y recuperación de contraseña. 
Autorización por rol implementada con @PreAuthorize o configuración de SecurityFilterChain según el rol. 
Validaciones de todos los campos en el backend usando Bean Validation (@Valid, @NotBlank, @Size, @Email, etc.) en los DTOs de entrada. 
No se aceptan validaciones manuales dentro del controlador. 
Respuestas de error en formato JSON con el código HTTP correcto según el caso (400, 401, 403, 404, 422, 500), manejadas con @ControllerAdvice y @ExceptionHandler. Relaciones JPA correctamente definidas entre entidades (@OneToMany, @ManyToMany, etc.) con manejo adecuado del fetch type para evitar el problema N+1. 
Uso de DTOs para formatear las respuestas de la API. No exponer directamente las entidades JPA.