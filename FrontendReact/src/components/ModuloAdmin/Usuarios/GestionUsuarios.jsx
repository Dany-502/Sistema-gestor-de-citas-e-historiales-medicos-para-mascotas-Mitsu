import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import DetallesUsuarioModal from './DetallesUsuarioModal';
import { clienteService, veterinarioService } from '../../../services/api';
import iconOjo from '../../../assets/iconos/ojo.svg';
import iconBasura from '../../../assets/iconos/barra-de-basura.svg';
import './GestionUsuariosEstilos.css';

const GestionUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [filtroRol, setFiltroRol] = useState('');
    
    // Estados para el Modal de Detalles
    const [modalAbierto, setModalAbierto] = useState(false);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

    useEffect(() => {
        const cargarUsuariosAPI = async () => {
            try {
                const [clientes, veterinarios] = await Promise.all([
                    clienteService.obtenerTodos().catch(() => []),
                    veterinarioService.obtenerVeterinarios().catch(() => [])
                ]);

                const listaClientesMapeados = (clientes || []).map(c => ({
                    id: c.idCliente || c.id,
                    nombre: c.nombre,
                    apellido: c.apPaterno || '',
                    correo: c.correoElectronico || c.correo,
                    rol: 'Cliente',
                    fechaRegistro: '2026-07-01',
                    mascotas: c.mascotas || []
                }));

                const listaVetsMapeados = (veterinarios || []).map(v => ({
                    id: v.idVeterinario || v.id,
                    nombre: v.nombre,
                    apellido: v.apPaterno || '',
                    correo: v.correoElectronico || v.correo,
                    rol: 'Veterinario',
                    fechaRegistro: '2026-06-01',
                    especialidad: v.especialidad,
                    cedula: v.cedula,
                    horarios: v.horarios || []
                }));

                const listaCombinada = [...listaVetsMapeados, ...listaClientesMapeados];
                if (listaCombinada.length > 0) {
                    setUsuarios(listaCombinada);
                }
            } catch (err) {
                console.error("Error al obtener usuarios backend:", err);
                setUsuarios([]);
            }
        };

        cargarUsuariosAPI();
    }, []);

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
                // Usar prevUsuarios para asegurar el estado más reciente y forzar a String ambos IDs para evitar bugs de tipos
                setUsuarios(prevUsuarios => prevUsuarios.filter(u => String(u.id) !== String(id)));
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
