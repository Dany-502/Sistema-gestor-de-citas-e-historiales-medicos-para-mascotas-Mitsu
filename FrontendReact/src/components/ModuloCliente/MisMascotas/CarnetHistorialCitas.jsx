import React from 'react';

const CarnetHistorialCitas = ({ 
    historialCitas, 
    mostrarFormDiagnostico, 
    setMostrarFormDiagnostico, 
    datosDiagnostico, 
    setDatosDiagnostico 
}) => {
    return (
        <div className="tablaCarnetContenedor">
            {mostrarFormDiagnostico ? (
                <div className="formularioVeterinario">
                    <h3>Redactar Diagnóstico Clínico</h3>
                    <div className="formGrid">
                        <div className="formGroup full-width">
                            <label>Vincular a Cita (ID Cita)</label>
                            <select value={datosDiagnostico.idCita} onChange={e => setDatosDiagnostico({...datosDiagnostico, idCita: e.target.value})}>
                                <option value="">Selecciona una cita pasada...</option>
                                {historialCitas && historialCitas.map(c => (
                                    <option key={c.id} value={c.id}>Cita {c.fecha} - {c.servicio}</option>
                                ))}
                            </select>
                        </div>
                        <div className="formGroup full-width">
                            <label>Descripción / Motivo de la Cita</label>
                            <textarea rows="3" value={datosDiagnostico.descripcionCita} onChange={e => setDatosDiagnostico({...datosDiagnostico, descripcionCita: e.target.value})} placeholder="Ej. El paciente presenta vómito desde hace 2 días..."></textarea>
                        </div>
                        <div className="formGroup full-width">
                            <label>Diagnóstico Médico</label>
                            <textarea rows="4" value={datosDiagnostico.diagnostico} onChange={e => setDatosDiagnostico({...datosDiagnostico, diagnostico: e.target.value})} placeholder="Ej. Infección estomacal. Se receta antibiótico y reposo."></textarea>
                        </div>
                    </div>
                    <div className="formAcciones">
                        <button className="btnCancelarForm" onClick={() => setMostrarFormDiagnostico(false)}>Cancelar</button>
                        <button className="btnGuardarForm" onClick={() => {
                            console.log("Guardando diagnóstico...", datosDiagnostico);
                            setMostrarFormDiagnostico(false);
                        }}>Guardar Diagnóstico</button>
                    </div>
                </div>
            ) : (
                historialCitas && historialCitas.length > 0 ? (
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
                )
            )}
        </div>
    );
};

export default CarnetHistorialCitas;
