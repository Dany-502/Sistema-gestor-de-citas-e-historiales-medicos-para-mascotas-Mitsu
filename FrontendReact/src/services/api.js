const API_BASE_URL = 'http://localhost:8080/api';

/**
 * Función auxiliar para realizar peticiones HTTP autenticadas con JWT.
 */
async function fetchConAuth(endpoint, options = {}) {
    const token = localStorage.getItem('token');

    if (!token) {
        throw new Error('No has iniciado sesión o la sesión expiró. Por favor inicia sesión.');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
    };

    const config = {
        ...options,
        headers,
    };

    const respuesta = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (respuesta.status === 401 || respuesta.status === 403) {
        localStorage.removeItem('token');
        throw new Error('Tu sesión ha expirado o el token no es válido. Por favor, vuelve a iniciar sesión.');
    }

    if (!respuesta.ok) {
        let mensajeError = 'Error en la solicitud al servidor';
        try {
            const dataError = await respuesta.json();
            mensajeError = dataError.message || dataError.error || dataError.mensaje || mensajeError;
        } catch (e) {
            // Si la respuesta no es JSON
        }
        throw new Error(mensajeError);
    }

    const text = await respuesta.text();
    return text ? JSON.parse(text) : {};
}

// Servicios de Autenticación y Cliente
export const clienteService = {
    obtenerPerfil: () => fetchConAuth('/clientes/me'),
};

// Servicios de Mascotas
export const mascotaService = {
    obtenerMascotas: () => fetchConAuth('/mascotas'),
    registrarMascota: (datosMascota) => fetchConAuth('/mascotas', {
        method: 'POST',
        body: JSON.stringify(datosMascota),
    }),
    actualizarMascota: (idMascota, datosMascota) => fetchConAuth(`/mascotas/${encodeURIComponent(idMascota)}`, {
        method: 'PUT',
        body: JSON.stringify(datosMascota),
    }),
    eliminarMascota: (idMascota) => fetchConAuth(`/mascotas/${encodeURIComponent(idMascota)}`, {
        method: 'DELETE',
    }),
};
