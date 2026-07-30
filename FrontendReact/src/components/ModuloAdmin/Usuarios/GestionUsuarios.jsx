import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DetallesUsuarioModal from './DetallesUsuarioModal';
import iconOjo from '../../../assets/iconos/ojo.svg';
import iconBasura from '../../../assets/iconos/barra-de-basura.svg';
import './GestionUsuariosEstilos.css';

const GestionUsuarios = () => {
    // Datos simulados iniciales
    const [usuarios, setUsuarios] = useState([
        { 
            id: 1, nombre: 'Miguel', apellido: 'Alonso', correo: 'vet@mistu.com', rol: 'Veterinario', fechaRegistro: '2026-01-15',
            especialidad: 'Medicina General', cedula: '12345678', 
            horarios: [
                { diaSemana: 'Lunes', horaInicio: '09:00', horaFin: '18:00' },
                { diaSemana: 'Martes', horaInicio: '09:00', horaFin: '18:00' },
                { diaSemana: 'Miércoles', horaInicio: '09:00', horaFin: '18:00' },
                { diaSemana: 'Jueves', horaInicio: '09:00', horaFin: '18:00' },
                { diaSemana: 'Viernes', horaInicio: '09:00', horaFin: '18:00' },
                { diaSemana: 'Sábado', horaInicio: '10:00', horaFin: '14:00' }
            ]
        },
        { 
            id: 2, nombre: 'María', apellido: 'Fernández', correo: 'maria@gmail.com', rol: 'Cliente', fechaRegistro: '2026-03-22',
            mascotas: [
                { idMascota: 'M001', nombre: 'Firulais', especie: 'Perro', raza: 'Mestizo' },
                { idMascota: 'M002', nombre: 'Michi', especie: 'Gato', raza: 'Siamés' },
                { idMascota: 'M003', nombre: 'Pipo', especie: 'Pájaro', raza: 'Canario' }
            ]
        },
        { id: 3, nombre: 'Admin', apellido: 'Mistu', correo: 'admin@mistu.com', rol: 'Admin', fechaRegistro: '2025-12-01' },
        { id: 4, nombre: 'Carlos', apellido: 'Gómez', correo: 'carlos.g@hotmail.com', rol: 'Cliente', fechaRegistro: '2026-05-10' },
        { 
            id: 5, nombre: 'Ana', apellido: 'Pérez', correo: 'ana.perez@mistu.com', rol: 'Veterinario', fechaRegistro: '2026-02-05',
            especialidad: 'Cirugía Veterinaria', cedula: '87654321', 
            horarios: [
                { diaSemana: 'Lunes', horaInicio: '10:00', horaFin: '20:00' },
                { diaSemana: 'Miércoles', horaInicio: '10:00', horaFin: '20:00' },
                { diaSemana: 'Viernes', horaInicio: '10:00', horaFin: '20:00' }
            ]
        },
        { id: 6, nombre: 'Luis', apellido: 'Ramírez', correo: 'luis.r@gmail.com', rol: 'Cliente', fechaRegistro: '2026-06-11' },
        { id: 7, nombre: 'Sofía', apellido: 'Martínez', correo: 'sofia.m@gmail.com', rol: 'Cliente', fechaRegistro: '2026-06-15' },
        { id: 8, nombre: 'Jorge', apellido: 'Díaz', correo: 'jdiaz@mistu.com', rol: 'Admin', fechaRegistro: '2026-06-20' },
        { id: 9, nombre: 'Camila', apellido: 'Rojas', correo: 'camila.r@gmail.com', rol: 'Cliente', fechaRegistro: '2026-07-01' },
        { id: 10, nombre: 'Roberto', apellido: 'Sánchez', correo: 'roberto.s@mistu.com', rol: 'Veterinario', fechaRegistro: '2026-07-05', especialidad: 'Odontología', cedula: '44556677' },
        { id: 11, nombre: 'Laura', apellido: 'Gutiérrez', correo: 'laura.g@gmail.com', rol: 'Cliente', fechaRegistro: '2026-07-10' },
        { id: 12, nombre: 'Diego', apellido: 'Torres', correo: 'diego.t@gmail.com', rol: 'Cliente', fechaRegistro: '2026-07-12' },
        { id: 13, nombre: 'Valentina', apellido: 'Flores', correo: 'valentina.f@mistu.com', rol: 'Veterinario', fechaRegistro: '2026-07-18', especialidad: 'Dermatología', cedula: '99887766' },
        { id: 14, nombre: 'Andrés', apellido: 'Castro', correo: 'andres.c@gmail.com', rol: 'Cliente', fechaRegistro: '2026-07-22' },
        { id: 15, nombre: 'Isabella', apellido: 'Ortiz', correo: 'isabella.o@gmail.com', rol: 'Cliente', fechaRegistro: '2026-07-25' },
    ]);

    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    
    // Estados para el Modal de Detalles
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    const eliminarUsuario = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción eliminará al usuario permanentemente y todos sus registros asociados.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff3b30',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                setUsuarios(usuarios.filter(u => u.id !== id));
                Swal.fire(
                    '¡Eliminado!',
                    'El usuario ha sido dado de baja del sistema.',
                    'success'
                );
            }
        });
    };

    const verDetalles = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setModalAbierto(true);
    };

    // Filtrar usuarios
    const usuariosFiltrados = usuarios.filter(u => {
        const coincideBusqueda = 
            u.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
            u.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
            u.correo.toLowerCase().includes(busqueda.toLowerCase());
        
        const coincideRol = filtroRol ? u.rol.toLowerCase() === filtroRol.toLowerCase() : true;
        
        return coincideBusqueda && coincideRol;
    });

    return (
        <div className="contenedorUsuarios">
            <div className="cabeceraUsuarios">
                <div className="textosCabeceraUsuarios">
                    <h2 className="tituloUsuarios">Gestión de Usuarios</h2>
                    <p className="subtituloUsuarios">Administra clientes, veterinarios y personal del sistema (CRUD).</p>
                </div>
            </div>

            <div className="barraHerramientasUsuarios">
                <input 
                    type="text" 
                    placeholder="Buscar por nombre, apellido o correo..." 
                    className="buscadorUsuarios"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                />
                <select 
                    className="selectFiltroUsuarios"
                    value={filtroRol}
                    onChange={(e) => setFiltroRol(e.target.value)}
                >
                    <option value="">Todos los Roles</option>
                    <option value="Cliente">Clientes</option>
                    <option value="Veterinario">Veterinarios</option>
                    <option value="Admin">Administradores</option>
                </select>
            </div>

            <div className="tablaUsuariosContenedor">
                <table className="tablaUsuarios">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre Completo</th>
                            <th>Correo Electrónico</th>
                            <th>Rol</th>
                            <th>Fecha Registro</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.length > 0 ? (
                            usuariosFiltrados.map(usuario => (
                                <tr key={usuario.id}>
                                    <td>#{usuario.id}</td>
                                    <td>{usuario.nombre} {usuario.apellido}</td>
                                    <td>{usuario.correo}</td>
                                    <td>
                                        <span className={`badgeRol ${usuario.rol.toLowerCase()}`}>
                                            {usuario.rol}
                                        </span>
                                    </td>
                                    <td>{usuario.fechaRegistro}</td>
                                    <td>
                                        {usuario.rol !== 'Admin' && (
                                            <div className="accionesUsuario">
                                                <button 
                                                    className="btnAccionUsuario ver btn-accion-admin" 
                                                    title="Ver Detalles"
                                                    onClick={() => verDetalles(usuario)}
                                                >
                                                    <img src={iconOjo} alt="Ver" className="icono-accion-admin" />
                                                </button>
                                                <button 
                                                    className="btnAccionUsuario eliminar btn-accion-admin" 
                                                    title="Eliminar Usuario"
                                                    onClick={() => eliminarUsuario(usuario.id)}
                                                >
                                                    <img src={iconBasura} alt="Eliminar" className="icono-accion-admin" />
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="td-vacio-admin">
                                    No se encontraron usuarios que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <DetallesUsuarioModal 
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                usuario={usuarioSeleccionado}
            />
        </div>
    );
};

export default GestionUsuarios;
