import React from 'react';
import './CarruselPacientesEstilos.css';

const CarruselProximosPacientes = ({ proximosPacientes, indiceActual, setIndiceActual, cargandoPaciente, onCancelarCita, onAbrirExpediente }) => {
    const pacienteActual = proximosPacientes[indiceActual] || null;

    return (
        <div className="panel-proximo-paciente">
            <h2 className="section-subtitle">Próximas citas confirmadas</h2>
            
            {cargandoPaciente ? (
                <div className="esqueleto-paciente">
                    <div className="esqueleto-avatar"></div>
                    <div className="esqueleto-linea"></div>
                    <div className="esqueleto-linea corto"></div>
                </div>
            ) : proximosPacientes.length > 0 ? (
                <div className="carrusel-pacientes-container">
                    <button 
                        className="btn-carrusel-nav" 
                        onClick={() => setIndiceActual(prev => Math.max(0, prev - 1))}
                        disabled={indiceActual === 0}
                    >
                        &#10094;
                    </button>

                    <div className="paciente-card actual">
                        <div className="paciente-info-container">
                            <div className="paciente-avatar">
                                <div className="avatar-placeholder">{pacienteActual.nombre.charAt(0)}</div>
                            </div>
                            <div className="paciente-detalles">
                                <h3 className="paciente-nombre">
                                    {pacienteActual.nombre} <span className="paciente-raza">({pacienteActual.especie}, {pacienteActual.raza})</span> - {pacienteActual.hora}
                                </h3>
                                <p className="paciente-dato"><strong>Servicio:</strong> {pacienteActual.servicio}</p>
                                <p className="paciente-dato"><strong>Dueño:</strong> {pacienteActual.dueno}</p>

                                <div className="paciente-acciones">
                                    <button className="btn-cancelar" onClick={onCancelarCita}>Cancelar</button>
                                    <button 
                                        className="btn-detalles"
                                        onClick={onAbrirExpediente}
                                    >
                                        Expediente
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button 
                        className="btn-carrusel-nav" 
                        onClick={() => setIndiceActual(prev => Math.min(proximosPacientes.length - 1, prev + 1))}
                        disabled={indiceActual === proximosPacientes.length - 1}
                    >
                        &#10095;
                    </button>
                </div>
            ) : (
                <div className="paciente-card actual estado-vacio">
                    <p>No tienes citas confirmadas próximas.</p>
                </div>
            )}
        </div>
    );
};

export default CarruselProximosPacientes;
