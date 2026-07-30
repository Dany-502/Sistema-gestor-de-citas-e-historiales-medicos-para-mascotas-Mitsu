import React, { useState, useEffect } from 'react';
import './ConfigurarHorarioModal.css';

const ConfigurarHorarioModal = ({ isOpen, onClose, horaAperturaActual, horaCierreActual, onGuardar }) => {
    const [apertura, setApertura] = useState(horaAperturaActual);
    const [cierre, setCierre] = useState(horaCierreActual);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            setApertura(horaAperturaActual);
            setCierre(horaCierreActual);
            setError('');
        }
    }, [isOpen, horaAperturaActual, horaCierreActual]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const numApertura = parseInt(apertura, 10);
        const numCierre = parseInt(cierre, 10);

        if (numApertura >= numCierre) {
            setError('La hora de apertura debe ser menor a la hora de cierre.');
            return;
        }

        onGuardar(numApertura, numCierre);
    };

    return (
        <div className="modalOverlayConfiguracion">
            <div className="modalContenidoConfiguracion">
                <button className="btnCerrarModal" onClick={onClose}>×</button>
                <h2 className="tituloModalConfiguracion">Configuración de Horario</h2>
                
                <form onSubmit={handleSubmit} className="formularioConfiguracion">
                    {error && <div className="mensajeErrorConfiguracion">{error}</div>}
                    
                    <div className="grupoFormularioConfig">
                        <label>Hora de Apertura (formato 24h)</label>
                        <input 
                            type="number" 
                            min="0" max="23" 
                            value={apertura} 
                            onChange={(e) => setApertura(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="grupoFormularioConfig">
                        <label>Hora de Cierre (formato 24h)</label>
                        <input 
                            type="number" 
                            min="0" max="23" 
                            value={cierre} 
                            onChange={(e) => setCierre(e.target.value)}
                            required
                        />
                    </div>
                    
                    <div className="accionesModalConfiguracion">
                        <button type="button" className="btnSecundarioConfig" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btnPrimarioConfig">Guardar Horario</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ConfigurarHorarioModal;
