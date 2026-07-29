import React from 'react';

const CarnetHistorialVacunas = ({ 
    historialVacunas, 
    mostrarFormVacuna, 
    setMostrarFormVacuna, 
    datosVacuna, 
    setDatosVacuna 
}) => {
    return (
        <div className="tablaCarnetContenedor">
            {mostrarFormVacuna ? (
                <div className="formularioVeterinario">
                    <h3>Registrar Nueva Vacuna</h3>
                    <div className="formGrid">
                        <div className="formGroup">
                            <label>Nombre de la Dosis / Vacuna</label>
                            <input type="text" value={datosVacuna.nombreDosis} onChange={e => setDatosVacuna({...datosVacuna, nombreDosis: e.target.value})} placeholder="Ej. Rabia, Parvovirus..." />
                        </div>
                        <div className="formGroup">
                            <label>Fecha de Aplicación</label>
                            <input type="date" value={datosVacuna.fechaAplicacion} onChange={e => setDatosVacuna({...datosVacuna, fechaAplicacion: e.target.value})} />
                        </div>
                        <div className="formGroup">
                            <label>Próxima Aplicación (Opcional)</label>
                            <input type="date" value={datosVacuna.fechaProxAplicacion} onChange={e => setDatosVacuna({...datosVacuna, fechaProxAplicacion: e.target.value})} />
                        </div>
                        <div className="formGroup">
                            <label>Peso (kg)</label>
                            <input type="number" step="0.1" value={datosVacuna.pesoAplicacion} onChange={e => setDatosVacuna({...datosVacuna, pesoAplicacion: e.target.value})} placeholder="Ej. 4.5" />
                        </div>
                    </div>
                    <div className="formAcciones">
                        <button className="btnCancelarForm" onClick={() => setMostrarFormVacuna(false)}>Cancelar</button>
                        <button className="btnGuardarForm" onClick={() => {
                            console.log("Guardando vacuna...", datosVacuna);
                            setMostrarFormVacuna(false);
                        }}>Guardar Registro</button>
                    </div>
                </div>
            ) : (
                historialVacunas && historialVacunas.length > 0 ? (
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
                )
            )}
        </div>
    );
};

export default CarnetHistorialVacunas;
