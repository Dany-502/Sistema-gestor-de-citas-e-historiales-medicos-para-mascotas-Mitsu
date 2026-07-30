import React from 'react';
import '../../ModuloVeterinario/DirectorioClientes/DetalleClienteModalEstilos.css'; // Reutilizamos estilos

const DetallesUsuarioModal = ({ isOpen, onClose, usuario }) => {
    if (!isOpen || !usuario) return null;

    // Prevenir que el click dentro del modal lo cierre
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const esVeterinario = usuario.rol === 'Veterinario';

    return (
        <div className="modalFondoDetalleCliente" onClick={onClose}>
            <div className="modalContenidoDetalleCliente" onClick={handleModalClick}>
                <div className="modalCabeceraDetalleCliente">
                    <h2>Detalles del Usuario ({usuario.rol})</h2>
                    <button className="botonCerrarModal" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modalCuerpoDetalleCliente">
                    <div className="seccionInfoCliente">
                        <h3>Información General</h3>
                        <div className="gridInfoModal">
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">Nombre Completo</span>
                                <span className="valorInfoModal">{usuario.nombre} {usuario.apellido}</span>
                            </div>
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">Correo Electrónico</span>
                                <span className="valorInfoModal">{usuario.correo || 'No especificado'}</span>
                            </div>
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">Fecha de Registro</span>
                                <span className="valorInfoModal">{usuario.fechaRegistro || 'No especificada'}</span>
                            </div>
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">ID del Sistema</span>
                                <span className="valorInfoModal">#{usuario.id}</span>
                            </div>
                        </div>
                    </div>

                    {!esVeterinario && usuario.rol !== 'Admin' && (
                        <div className="seccionInfoCliente">
                            <h3>Mascotas Vinculadas</h3>
                            {usuario.mascotas && usuario.mascotas.length > 0 ? (
                                <div className="contenedorTablaMascotas">
                                    <table className="tablaMascotas">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Nombre</th>
                                                <th>Especie</th>
                                                <th>Raza</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {usuario.mascotas.map((mascota, index) => (
                                                <tr key={index}>
                                                    <td className="idMascotaTd">{mascota.idMascota || 'N/A'}</td>
                                                    <td className="nombreMascotaTd">{mascota.nombre}</td>
                                                    <td>
                                                        <span className="especieBadge">{mascota.especie}</span>
                                                    </td>
                                                    <td className="razaMascotaTd">{mascota.raza || 'No especificada'}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="mensajeSinMascotas">Este cliente no tiene mascotas registradas actualmente.</p>
                            )}
                        </div>
                    )}

                    {esVeterinario && (
                        <div className="seccionInfoCliente">
                            <h3>Información Profesional</h3>
                            <div className="gridInfoModal">
                                <div className="itemInfoModal">
                                    <span className="labelInfoModal">Especialidad</span>
                                    <span className="valorInfoModal">{usuario.especialidad || 'No especificada'}</span>
                                </div>
                                <div className="itemInfoModal">
                                    <span className="labelInfoModal">Cédula Profesional</span>
                                    <span className="valorInfoModal">{usuario.cedula || 'No especificada'}</span>
                                </div>
                            </div>
                            
                            <h3 style={{ marginTop: '20px' }}>Horarios de Atención</h3>
                            {usuario.horarios && usuario.horarios.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    {usuario.horarios.map((horario, index) => (
                                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                            <span style={{ fontWeight: '600', color: '#334155' }}>{horario.diaSemana}</span>
                                            <span style={{ color: '#64748b' }}>{horario.horaInicio} - {horario.horaFin}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="mensajeSinMascotas">Este veterinario no tiene horarios registrados.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetallesUsuarioModal;
