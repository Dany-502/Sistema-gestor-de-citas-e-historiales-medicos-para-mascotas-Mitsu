import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import './ResumenCitaModalEstilos.css';
import iconoCabecera from '../../../assets/iconos/corazon-de-pata.png';
import iconoMedico from '../../../assets/iconos/medico.png';
import iconoCalendario from '../../../assets/iconos/calendario2.png';
import iconoPata from '../../../assets/iconos/pata.png';
import iconoEstetoscopio from '../../../assets/iconos/estetoscopio.png';
import iconoPortapapeles from '../../../assets/iconos/portapapeles.png';

const ResumenCitaModal = ({ isOpen, onClose, cita, onCancel, esVeterinario = false, onIrExpediente, onCompletarCita, onConfirmarCita }) => {
    if (!isOpen || !cita) return null;

    const handleCancelarClick = () => {
        Swal.fire({
            title: '¿Cancelar Cita?',
            text: '¿Estás seguro de que deseas cancelar esta cita? Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff3b30',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Sí, cancelar cita',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                onCancel(cita.idCita);
                Swal.fire({
                    title: 'Cancelada',
                    text: 'La cita ha sido cancelada exitosamente.',
                    icon: 'success',
                    confirmButtonColor: '#17c3b2'
                });
            }
        });
    };

    const handleCompletarClick = () => {
        Swal.fire({
            title: '¿Marcar como Realizada?',
            text: '¿Deseas marcar esta cita como completada/realizada?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#17c3b2',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Sí, completada',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                if (onCompletarCita) onCompletarCita(cita.idCita);
                Swal.fire({
                    title: '¡Realizada!',
                    text: 'La cita ha sido marcada como realizada.',
                    icon: 'success',
                    confirmButtonColor: '#17c3b2'
                });
            }
        });
    };

    const handleConfirmarClick = () => {
        Swal.fire({
            title: '¿Confirmar Cita?',
            text: '¿Deseas confirmar esta cita y notificar al cliente?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#17c3b2',
            cancelButtonColor: '#94a3b8',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                if (onConfirmarCita) onConfirmarCita(cita);
                Swal.fire({
                    title: '¡Confirmada!',
                    text: 'La cita ha sido confirmada.',
                    icon: 'success',
                    confirmButtonColor: '#17c3b2'
                });
                onClose();
            }
        });
    };

    // Determinar la clase del badge según el estado
    let claseEstado = 'badge-pendiente';
    if (cita.estado === 'Confirmada') claseEstado = 'badge-confirmada';
    else if (cita.estado === 'Realizada') claseEstado = 'badge-realizada';
    else if (cita.estado === 'Cancelada') claseEstado = 'badge-cancelada';

    return (
        <div className="modalOverlayResumen">
            <div className="modalContentResumen">
                
                <div className="cabeceraResumenCita">
                    <div className="circuloIconoCabecera">
                        <img src={iconoCabecera} alt="Mascota" />
                    </div>
                    <h3>Detalle de la Cita</h3>
                    <button className="botonCerrarResumen" onClick={onClose}>&times;</button>
                </div>

                <div className="cuerpoResumenCita">
                    
                    <div className="filaInfoResumen">
                        <div className="iconoInfoResumen">
                            <img src={iconoPata} alt="Mascota" />
                        </div>
                        <div className="datosInfoResumen">
                            <span className="labelInfoResumen">Mascota</span>
                            <span className="valorInfoResumen">{cita.nombreMascota}</span>
                        </div>
                    </div>

                    <div className="filaInfoResumen">
                        <div className="iconoInfoResumen">
                            <img src={iconoMedico} alt="Veterinario" />
                        </div>
                        <div className="datosInfoResumen">
                            <span className="labelInfoResumen">Veterinario</span>
                            <span className="valorInfoResumen">{cita.nombreVeterinario}</span>
                        </div>
                    </div>

                    <div className="filaInfoResumen">
                        <div className="iconoInfoResumen">
                            <img src={iconoEstetoscopio} alt="Servicio" />
                        </div>
                        <div className="datosInfoResumen">
                            <span className="labelInfoResumen">Servicio</span>
                            <span className="valorInfoResumen">{cita.nombreServicio}</span>
                        </div>
                    </div>

                    <div className="filaInfoResumen">
                        <div className="iconoInfoResumen">
                            <img src={iconoCalendario} alt="Fecha" />
                        </div>
                        <div className="datosInfoResumen">
                            <span className="labelInfoResumen">Fecha y Hora</span>
                            <span className="valorInfoResumen">{moment(cita.start).format('LLLL')}</span>
                        </div>
                    </div>

                    <div className="filaInfoResumen notasResumen">
                        <div className="iconoInfoResumen">
                            <img src={iconoPortapapeles} alt="Notas" />
                        </div>
                        <div className="datosInfoResumen">
                            <span className="labelInfoResumen">Notas / Descripción</span>
                            <span className="valorInfoResumen textoGris">{cita.descripcion || 'Sin observaciones'}</span>
                        </div>
                    </div>

                    <div className="contenedorEstadoResumen">
                        <span className="labelInfoResumen">Estado de la Cita:</span>
                        <span className={`badgeEstado ${claseEstado}`}>{cita.estado}</span>
                    </div>

                </div>

                <div className="pieResumenCita" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center' }}>
                    
                    {/* Botones exclusivos para el veterinario */}
                    {esVeterinario && cita.estado === 'Pendiente' && (
                        <button className="btnAccionPrimario" onClick={handleConfirmarClick} style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>
                            Confirmar Cita
                        </button>
                    )}
                    {esVeterinario && cita.estado === 'Confirmada' && (
                        <button className="btnAccionPrimario" onClick={handleCompletarClick} style={{ backgroundColor: '#0077cc', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>
                            Marcar como Realizada
                        </button>
                    )}
                    {esVeterinario && (
                        <button className="btnAccionPrimario" onClick={() => { if(onIrExpediente) onIrExpediente(cita) }} style={{ backgroundColor: '#4a5568', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', flex: 1 }}>
                            Ir al Expediente
                        </button>
                    )}

                    {(cita.estado === 'Pendiente' || cita.estado === 'Confirmada') && (
                        <button className="btnCancelarSecundario" onClick={handleCancelarClick} style={{ flex: 1 }}>
                            Cancelar Cita
                        </button>
                    )}
                    <button className="btnCerrarPrimario" onClick={onClose} style={{ flex: 1 }}>Cerrar</button>
                </div>

            </div>
        </div>
    );
};

export default ResumenCitaModal;
