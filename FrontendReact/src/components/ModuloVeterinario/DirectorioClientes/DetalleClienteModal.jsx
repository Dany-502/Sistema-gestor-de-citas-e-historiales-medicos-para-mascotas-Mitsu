import React from 'react';
import './DetalleClienteModalEstilos.css';

const DetalleClienteModal = ({ isOpen, onClose, cliente }) => {
    if (!isOpen || !cliente) return null;

    // Prevenir que el click dentro del modal lo cierre
    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="modalFondoDetalleCliente" onClick={onClose}>
            <div className="modalContenidoDetalleCliente" onClick={handleModalClick}>
                <div className="modalCabeceraDetalleCliente">
                    <h2>Detalles del Cliente</h2>
                    <button className="botonCerrarModal" onClick={onClose}>&times;</button>
                </div>
                
                <div className="modalCuerpoDetalleCliente">
                    <div className="seccionInfoCliente">
                        <h3>Información de Contacto</h3>
                        <div className="gridInfoModal">
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">Nombre Completo</span>
                                <span className="valorInfoModal">{cliente.nombre} {cliente.apPaterno} {cliente.apMaterno}</span>
                            </div>
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">Teléfono</span>
                                <span className="valorInfoModal">{cliente.telefono || 'No especificado'}</span>
                            </div>
                            <div className="itemInfoModal">
                                <span className="labelInfoModal">Correo Electrónico</span>
                                <span className="valorInfoModal">{cliente.correoElectronico || 'No especificado'}</span>
                            </div>
                            <div className="itemInfoModal" style={{ gridColumn: '1 / -1' }}>
                                <span className="labelInfoModal">Dirección</span>
                                <span className="valorInfoModal">{cliente.direccion || 'No especificada'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="seccionInfoCliente">
                        <h3>Mascotas Vinculadas</h3>
                        {cliente.mascotas && cliente.mascotas.length > 0 ? (
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
                                        {cliente.mascotas.map((mascota, index) => (
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
                </div>
            </div>
        </div>
    );
};

export default DetalleClienteModal;
