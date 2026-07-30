import React, { useState, useEffect } from 'react';

const CarnetHistorialCitas = ({ 
    historialCitas, 
    mostrarFormDiagnostico, 
    setMostrarFormDiagnostico, 
    datosDiagnostico, 
    setDatosDiagnostico,
    idMascota
}) => {
    const [citasDisponibles, setCitasDisponibles] = useState([]);

    useEffect(() => {
        if (mostrarFormDiagnostico) {
            import('../../../services/api').then(({ citaService }) => {
                citaService.obtenerTodas().then(todas => {
                    const citasMascota = todas.filter(c => c.mascotaId === idMascota && (c.estado === 'Realizada' || c.estado === 'Pendiente' || c.estado === 'Confirmada'));
                    setCitasDisponibles(citasMascota);
                }).catch(err => console.error(err));
            });
        }
    }, [mostrarFormDiagnostico, idMascota]);

    const handleGuardarDiagnostico = async () => {
        try {
            const { mascotaService } = await import('../../../services/api');
            const Swal = (await import('sweetalert2')).default;
            
            if (!datosDiagnostico.idCita) {
                Swal.fire('Atención', 'Debes seleccionar una cita', 'warning');
                return;
            }
            
            Swal.fire({ title: 'Guardando...', allowOutsideClick: false, didOpen: () => Swal.showLoading() });
            
            const nuevoHistorial = await mascotaService.registrarHistorial(idMascota, {
                idCita: parseInt(datosDiagnostico.idCita),
                motivo: datosDiagnostico.descripcionCita,
                diagnostico: datosDiagnostico.diagnostico
            });
            
            historialCitas.unshift(nuevoHistorial); // Add locally
            
            Swal.fire('Guardado', 'El diagnóstico ha sido guardado exitosamente.', 'success');
            setMostrarFormDiagnostico(false);
            setDatosDiagnostico({ idCita: '', descripcionCita: '', diagnostico: '' });
        } catch (error) {
            const Swal = (await import('sweetalert2')).default;
            Swal.fire('Error', 'No se pudo guardar: ' + error.message, 'error');
        }
    };

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
                                {citasDisponibles.map(c => (
                                    <option key={c.idCita} value={c.idCita}>Cita {new Date(c.fechaHoraInicio).toLocaleDateString()} - {c.nombreServicio}</option>
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
                        <button className="btnGuardarForm" onClick={handleGuardarDiagnostico}>Guardar Diagnóstico</button>
                    </div>
                </div>
            ) : (
                historialCitas && historialCitas.length > 0 ? (
                    <table className="tablaCarnet">
                        <thead>
                            <tr>
                                <th>Fecha</th>
                                <th>Motivo / Descripción</th>
                                <th>Veterinario</th>
                                <th>Diagnóstico</th>
                            </tr>
                        </thead>
                        <tbody>
                            {historialCitas.map(c => (
                                <tr key={c.idHistorial}>
                                    <td><strong>{c.fecha ? new Date(c.fecha).toLocaleDateString() : 'N/A'}</strong></td>
                                    <td>{c.motivo}</td>
                                    <td>{c.veterinario}</td>
                                    <td>{c.diagnostico}</td>
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
