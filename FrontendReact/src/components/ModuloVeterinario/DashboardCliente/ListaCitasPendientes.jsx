import React from 'react';
import './CitasPendientesEstilos.css';

const ListaCitasPendientes = ({ citasPendientes, onConfirmarCita, onAbrirDetalles }) => {
    return (
        <div className="citas-pendientes-section">
            <div className="citas-pendientes-header">
                <h2 className="section-subtitle">Citas pendientes</h2>
                <span className="citas-leyenda">
                    Confirma las citas solicitadas por los clientes para pasarlas a tu agenda.
                </span>
            </div>
            <div className="citas-lista">
                {citasPendientes.map((cita) => (
                    <div key={cita.id} className="cita-item">
                        <span className="cita-fecha-columna">{cita.fecha}</span>
                        <span className="cita-hora">{cita.hora}</span>

                        <div className="cita-info-mascota">
                            <div className="cita-detalles-mascota">
                                <h4 className="cita-nombre">{cita.nombre}</h4>
                                <p className="cita-raza">({cita.especie}, {cita.raza})</p>
                            </div>
                        </div>

                        <span className="cita-servicio">{cita.servicio}</span>

                        <div className="cita-acciones">
                            <button 
                                className="btn-atender"
                                onClick={() => onConfirmarCita(cita)}
                            >
                                Confirmar cita
                            </button>
                            <button
                                className="btn-detalles-sm"
                                onClick={() => onAbrirDetalles(cita)}
                            >
                                Ver detalles
                            </button>
                        </div>
                    </div>
                ))}
                
                {citasPendientes.length === 0 && (
                    <p className="mensaje-vacio">No hay citas pendientes por confirmar.</p>
                )}
            </div>
        </div>
    );
};

export default ListaCitasPendientes;
