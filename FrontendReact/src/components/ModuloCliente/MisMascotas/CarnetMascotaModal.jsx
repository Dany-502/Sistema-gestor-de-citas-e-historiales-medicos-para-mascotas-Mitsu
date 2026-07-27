import React, { useState } from 'react';
import './CarnetMascotaEstilos.css';
import iconPata from '../../../assets/iconos/pata.png'; // Fallback icon
import iconLapiz from '../../../assets/iconos/lapiz-blog.png';

const CarnetMascotaModal = ({ mascotaDto, onEditar, onClose }) => {
    const [pestanaActiva, setPestanaActiva] = useState('informacion');

    // Desestructuración segura asumiendo la estructura del DTO propuesto para Spring Boot
    const {
        idMascota,
        nombreMascota,
        estado,
        especie,
        raza,
        sexo,
        fechaNacimiento,
        peso,
        color,
        adultoResponsable,
        fotoUrl, // Asumiremos que el backend enviará una URL de foto en el futuro
        historialVacunas = [],
        historialCitas = []
    } = mascotaDto || {};

    const renderContenido = () => {
        switch (pestanaActiva) {
            case 'informacion':
                return (
                    <div className="infoGeneralGrid">
                        {/* Grid de Datos de la Mascota */}
                        <div className="datosMascotaGrid">
                            <div className="datoItem">
                                <span className="datoLabel">Especie</span>
                                <span className="datoValor">{especie || 'N/A'}</span>
                            </div>
                            <div className="datoItem">
                                <span className="datoLabel">Fecha de Nacimiento</span>
                                <span className="datoValor">{fechaNacimiento || 'N/A'}</span>
                            </div>
                            <div className="datoItem">
                                <span className="datoLabel">Raza</span>
                                <span className="datoValor">{raza || 'N/A'}</span>
                            </div>
                            <div className="datoItem">
                                <span className="datoLabel">Peso</span>
                                <span className="datoValor">{peso || 'N/A'}</span>
                            </div>
                            <div className="datoItem">
                                <span className="datoLabel">Sexo</span>
                                <span className="datoValor">{sexo || 'N/A'}</span>
                            </div>
                            <div className="datoItem">
                                <span className="datoLabel">Color</span>
                                <span className="datoValor">{color || 'N/A'}</span>
                            </div>
                        </div>

                        {/* Tarjeta Adulto Responsable */}
                        <div className="tarjetaResponsable">
                            <div className="responsableItem">
                                <span className="datoLabel">Adulto Responsable</span>
                                <span className="datoValor">{adultoResponsable?.nombreCliente || 'N/A'}</span>
                            </div>
                            <div className="responsableItem">
                                <span className="datoLabel">Teléfono de Contacto</span>
                                <span className="datoValor">{adultoResponsable?.telefonoContacto || 'N/A'}</span>
                            </div>
                        </div>
                    </div>
                );
            case 'vacunas':
                return (
                    <div className="tablaCarnetContenedor">
                        {historialVacunas.length > 0 ? (
                            <table className="tablaCarnet">
                                <thead>
                                    <tr>
                                        <th>Dosis / Vacuna</th>
                                        <th>Fecha Aplicación</th>
                                        <th>Próxima Aplicación</th>
                                        <th>Peso</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historialVacunas.map(v => (
                                        <tr key={v.id}>
                                            <td><strong>{v.vacuna}</strong></td>
                                            <td>{v.fecha}</td>
                                            <td>{v.proxima}</td>
                                            <td>{v.peso}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="seccionVacia">
                                <p>No hay registro de vacunas.</p>
                            </div>
                        )}
                    </div>
                );
            case 'citas':
                return (
                    <div className="tablaCarnetContenedor">
                        {historialCitas.length > 0 ? (
                            <table className="tablaCarnet">
                                <thead>
                                    <tr>
                                        <th>Fecha y Hora</th>
                                        <th>Servicio</th>
                                        <th>Veterinario Atendió</th>
                                        <th>Descripción</th>
                                        <th>Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historialCitas.map(c => (
                                        <tr key={c.id}>
                                            <td><strong>{c.fecha}</strong></td>
                                            <td>{c.servicio}</td>
                                            <td>{c.veterinario}</td>
                                            <td>{c.descripcion}</td>
                                            <td>
                                                <span className={`estadoBadge ${c.estado.toLowerCase()}`}>
                                                    {c.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="seccionVacia">
                                <p>No hay registro de citas previas.</p>
                            </div>
                        )}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="carnetOverlay" onClick={onClose}>
            <div className="carnetContent" onClick={e => e.stopPropagation()}>
                <button className="btnCerrarCarnetX" onClick={onClose}>&times;</button>
                
                {/* Cabecera del Carnet */}
                <div className="carnetHeader">
                    <div className="carnetHeaderLeft">
                        <div className="carnetIdBadge">ID: {idMascota || '---'}</div>
                        <h1 className="carnetNombre">{nombreMascota || '---'}</h1>
                        {onEditar && (
                            <button className="btnEditarPerfil" onClick={onEditar}>
                                <img src={iconLapiz} alt="Editar" className="iconoEditarBtn" /> Editar Perfil
                            </button>
                        )}
                    </div>
                    
                    <div className="carnetFotoContainer">
                        {fotoUrl ? (
                            <img src={fotoUrl} alt={nombreMascota} />
                        ) : (
                            // Placeholder si no hay foto real
                            <img src={iconPata} alt="Pata placeholder" style={{opacity: 0.1, padding: '30px'}} />
                        )}
                    </div>
                </div>

                {/* Pestañas (Tabs) */}
                <div className="carnetTabsContainer">
                    <button 
                        className={`carnetTab ${pestanaActiva === 'informacion' ? 'active' : ''}`}
                        onClick={() => setPestanaActiva('informacion')}
                    >
                        Información general
                    </button>
                    <button 
                        className={`carnetTab ${pestanaActiva === 'vacunas' ? 'active' : ''}`}
                        onClick={() => setPestanaActiva('vacunas')}
                    >
                        Historial de vacunas
                    </button>
                    <button 
                        className={`carnetTab ${pestanaActiva === 'citas' ? 'active' : ''}`}
                        onClick={() => setPestanaActiva('citas')}
                    >
                        Historial de citas
                    </button>
                </div>

                {/* Contenido Dinámico */}
                <div className="carnetBody">
                    {renderContenido()}
                </div>

                {/* Banda inferior de color */}
                <div className="bandaInferiorColor"></div>
            </div>
        </div>
    );
};

export default CarnetMascotaModal;
