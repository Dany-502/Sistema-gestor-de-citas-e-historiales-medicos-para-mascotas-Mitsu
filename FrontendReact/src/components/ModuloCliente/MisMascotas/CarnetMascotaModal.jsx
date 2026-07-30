import React, { useState } from 'react';
import './CarnetMascotaEstilos.css';
import iconPata from '../../../assets/iconos/pata.png'; // Fallback icon
import iconLapiz from '../../../assets/iconos/lapiz-blog.png';
import CarnetInformacionGeneral from './CarnetInformacionGeneral';
import CarnetHistorialVacunas from './CarnetHistorialVacunas';
import CarnetHistorialCitas from './CarnetHistorialCitas';

const CarnetMascotaModal = ({ mascotaDto, onEditar, onClose, esVeterinario = false, esAdmin = false }) => {
    const [pestanaActiva, setPestanaActiva] = useState('informacion');

    // Estados para formularios veterinarios
    const [mostrarFormVacuna, setMostrarFormVacuna] = useState(false);
    const [datosVacuna, setDatosVacuna] = useState({
        nombreDosis: '',
        fechaAplicacion: new Date().toISOString().split('T')[0],
        fechaProxAplicacion: '',
        pesoAplicacion: ''
    });

    const [mostrarFormDiagnostico, setMostrarFormDiagnostico] = useState(false);
    const [datosDiagnostico, setDatosDiagnostico] = useState({
        idCita: '',
        descripcionCita: '',
        diagnostico: ''
    });

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
                    <CarnetInformacionGeneral 
                        especie={especie}
                        fechaNacimiento={fechaNacimiento}
                        raza={raza}
                        peso={peso}
                        sexo={sexo}
                        color={color}
                        adultoResponsable={adultoResponsable}
                    />
                );
            case 'vacunas':
                return (
                    <CarnetHistorialVacunas 
                        historialVacunas={historialVacunas}
                        mostrarFormVacuna={mostrarFormVacuna}
                        setMostrarFormVacuna={setMostrarFormVacuna}
                        datosVacuna={datosVacuna}
                        setDatosVacuna={setDatosVacuna}
                    />
                );
            case 'citas':
                return (
                    <CarnetHistorialCitas 
                        historialCitas={historialCitas}
                        mostrarFormDiagnostico={mostrarFormDiagnostico}
                        setMostrarFormDiagnostico={setMostrarFormDiagnostico}
                        datosDiagnostico={datosDiagnostico}
                        setDatosDiagnostico={setDatosDiagnostico}
                    />
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
                        {(fotoUrl || mascotaDto?.imagen) ? (
                            <img src={fotoUrl || mascotaDto?.imagen} alt={nombreMascota} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
                        ) : (
                            // Placeholder si no hay foto real
                            <img src={iconPata} alt="Pata placeholder" style={{opacity: 0.1, padding: '30px'}} />
                        )}
                    </div>
                </div>

                {/* Pestañas (Tabs) y Botones de Acción */}
                <div className="carnetTabsArea">
                    <div className="carnetTabsContainer">
                        <button 
                            className={`carnetTab ${pestanaActiva === 'informacion' ? 'active' : ''}`}
                            onClick={() => {
                                setPestanaActiva('informacion');
                                setMostrarFormVacuna(false);
                                setMostrarFormDiagnostico(false);
                            }}
                        >
                            Información general
                        </button>
                        <button 
                            className={`carnetTab ${pestanaActiva === 'vacunas' ? 'active' : ''}`}
                            onClick={() => {
                                setPestanaActiva('vacunas');
                                setMostrarFormDiagnostico(false);
                            }}
                        >
                            Historial de vacunas
                        </button>
                        <button 
                            className={`carnetTab ${pestanaActiva === 'citas' ? 'active' : ''}`}
                            onClick={() => {
                                setPestanaActiva('citas');
                                setMostrarFormVacuna(false);
                            }}
                        >
                            Historial de citas
                        </button>
                    </div>

                    <div className="carnetAccionesPestana">
                        {esVeterinario && pestanaActiva === 'vacunas' && !mostrarFormVacuna && (
                            <button className="btnVeterinario" onClick={() => setMostrarFormVacuna(true)}>
                                + Registrar Vacuna
                            </button>
                        )}
                        {esVeterinario && pestanaActiva === 'citas' && !mostrarFormDiagnostico && (
                            <button className="btnVeterinario" onClick={() => setMostrarFormDiagnostico(true)}>
                                + Redactar Diagnóstico
                            </button>
                        )}
                        {esAdmin && (
                            <button className="btnVeterinario" onClick={() => {
                                import('sweetalert2').then(Swal => {
                                    Swal.default.fire('Eliminado', 'Expediente borrado de la BD (Admin)', 'success');
                                    onClose();
                                });
                            }} style={{ backgroundColor: '#dc2626', borderColor: '#dc2626' }}>
                                Eliminar Expediente
                            </button>
                        )}
                    </div>
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
