import React, { useState, useEffect } from 'react';
import './FormularioNuevaCitaModalEstilos.css';
import Swal from 'sweetalert2';
import iconoPortapapeles from '../../../assets/iconos/portapapeles.png';

const FormularioNuevaCitaModal = ({ isOpen, onClose, onSave, citasProgramadas = [] }) => {
    const [fechaHoraInicio, setFechaHoraInicio] = useState('');
    const [fechaHoraFin, setFechaHoraFin] = useState('');
    const [mascota, setMascota] = useState('');
    const [servicio, setServicio] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [tipoVacuna, setTipoVacuna] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const mascotasDisponibles = [
        { idMascota: '#MX4052', nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', color: 'Dorado' },
        { idMascota: '#CH1108', nombre: 'Chloe', especie: 'Gato', raza: 'Siamés', color: 'Crema' }
    ];

    const veterinariosDisponibles = [
        { idVeterinario: 1, nombre: 'Dr. Juan Pérez', especialidad: 'Cirugía' },
        { idVeterinario: 2, nombre: 'Dra. María López', especialidad: 'Medicina General' },
        { idVeterinario: 3, nombre: 'Dr. Carlos Ruiz', especialidad: 'Odontología' }
    ];

    const tiposVacunas = [
        'Antirrábica',
        'Séxtuple',
        'Parvovirus',
        'Leucemia Felina',
        'Triple Felina'
    ];

    const serviciosDisponibles = [
        { idServicio: 1, nombreServicio: 'Consulta General', duracion: 60 },
        { idServicio: 2, nombreServicio: 'Vacunación', duracion: 30 },
        { idServicio: 3, nombreServicio: 'Cirugía', duracion: 120 },
        { idServicio: 4, nombreServicio: 'Limpieza Dental', duracion: 90 }
    ];

    useEffect(() => {
        if (fechaHoraInicio && servicio) {
            const servObj = serviciosDisponibles.find(s => s.idServicio === Number(servicio));
            if (servObj) {
                const start = new Date(fechaHoraInicio);
                const end = new Date(start.getTime() + servObj.duracion * 60000);
                
                // Formatear a datetime-local string (YYYY-MM-DDTHH:mm) respetando zona horaria local
                const tzOffset = end.getTimezoneOffset() * 60000;
                const localISOTime = (new Date(end.getTime() - tzOffset)).toISOString().slice(0, 16);
                setFechaHoraFin(localISOTime);
            }
        } else {
            setFechaHoraFin('');
        }
    }, [fechaHoraInicio, servicio]);

    // Calcular fecha actual para bloquear días pasados
    const tzOffsetNow = new Date().getTimezoneOffset() * 60000;
    const fechaActual = (new Date(Date.now() - tzOffsetNow)).toISOString().slice(0, 16);

    // Filtrar médicos según el servicio
    const medicosFiltrados = veterinariosDisponibles.filter(v => {
        if (!servicio) return true;
        if (servicio === '1' || servicio === '2') return v.especialidad === 'Medicina General';
        if (servicio === '3') return v.especialidad === 'Cirugía';
        if (servicio === '4') return v.especialidad === 'Odontología';
        return true;
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!fechaHoraInicio || !fechaHoraFin || !mascota || !servicio || !veterinario) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor, llena todos los campos obligatorios (*).',
                icon: 'warning',
                confirmButtonColor: '#ff8b6a'
            });
            return;
        }

        const mascotaObj = mascotasDisponibles.find(m => m.idMascota === mascota);
        const vetObj = veterinariosDisponibles.find(v => v.idVeterinario === Number(veterinario));
        const servObj = serviciosDisponibles.find(s => s.idServicio === Number(servicio));

        const fechaSeleccionadaInicio = new Date(fechaHoraInicio);
        const fechaSeleccionadaFin = new Date(fechaHoraFin);
        const horaInicio = fechaSeleccionadaInicio.getHours();

        // 1. Validación de Horario Laboral (9:00 AM a 6:00 PM)
        if (horaInicio < 9 || horaInicio >= 18) {
            Swal.fire({
                title: 'Fuera de Horario',
                text: 'La clínica solo opera de 9:00 AM a 6:00 PM.',
                icon: 'error',
                confirmButtonColor: '#ff8b6a'
            });
            return;
        }

        // 2. Validación de Cruce de Horarios (Double Booking)
        const medicoOcupado = citasProgramadas.some(cita => {
            if (cita.nombreVeterinario !== vetObj.nombre) return false;
            // Un choque ocurre si el inicio nuevo es antes del fin de la cita, y el fin nuevo es después del inicio
            const citaInicio = new Date(cita.start);
            const citaFin = new Date(cita.end);
            return fechaSeleccionadaInicio < citaFin && fechaSeleccionadaFin > citaInicio;
        });

        if (medicoOcupado) {
            Swal.fire({
                title: 'Médico No Disponible',
                text: `El ${vetObj.nombre} ya tiene una cita reservada en ese lapso de tiempo.`,
                icon: 'error',
                confirmButtonColor: '#ff8b6a'
            });
            return;
        }

        let descripcionFinal = descripcion;
        if (Number(servicio) === 2 && tipoVacuna) {
            descripcionFinal = `Vacuna solicitada: ${tipoVacuna}.\n${descripcion}`;
        }

        const nuevaCita = {
            idCita: Date.now(),
            mascotaId: mascota,
            nombreMascota: mascotaObj.nombre,
            nombreVeterinario: vetObj.nombre,
            nombreServicio: servObj.nombreServicio,
            start: new Date(fechaHoraInicio),
            end: new Date(fechaHoraFin),
            descripcion: descripcionFinal,
            estado: 'Pendiente'
        };

        onSave(nuevaCita);

        Swal.fire({
            title: '¡Cita Programada!',
            text: 'Tu cita ha sido agendada. Pendiente de aprobación por la veterinaria.',
            icon: 'success',
            confirmButtonColor: '#17c3b2',
            timer: 2500
        });

        // Limpiar form
        setFechaHoraInicio('');
        setFechaHoraFin('');
        setMascota('');
        setServicio('');
        setVeterinario('');
        setTipoVacuna('');
        setDescripcion('');

        onClose();
    };

    return (
        <div className="modalOverlayCita">
            <div className="modalContentCitaAncho">
                <div className="cabeceraModalCitaAncho">
                    <h3>
                        <img src={iconoPortapapeles} alt="Agendar" className="iconoTituloCitaImg" />
                        Agregar Cita
                    </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="formularioCitaAncho">
                    
                    <div className="filaGridCita">
                        <div className="grupoFormularioCita">
                            <label>Mascota<span className="asterisco">*</span></label>
                            <select 
                                value={mascota} 
                                onChange={(e) => setMascota(e.target.value)}
                                className="selectFormularioCita"
                            >
                                <option value="">Seleccionar</option>
                                {mascotasDisponibles.map(m => (
                                    <option key={m.idMascota} value={m.idMascota}>
                                        {m.nombre} - {m.especie}, {m.raza} ({m.color})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grupoFormularioCita">
                            <label>Servicio<span className="asterisco">*</span></label>
                            <select 
                                value={servicio} 
                                onChange={(e) => {
                                    setServicio(e.target.value);
                                    if(e.target.value !== '2') setTipoVacuna(''); 
                                }}
                                className="selectFormularioCita"
                            >
                                <option value="">Seleccionar</option>
                                <optgroup label="Servicios Médicos">
                                    <option value="1">Consulta General</option>
                                    <option value="2">Vacunación</option>
                                    <option value="3">Cirugía</option>
                                </optgroup>
                                <optgroup label="Estética">
                                    <option value="4">Limpieza Dental</option>
                                </optgroup>
                            </select>
                        </div>

                        <div className="grupoFormularioCita">
                            <label>Veterinario<span className="asterisco">*</span></label>
                            <select 
                                value={veterinario} 
                                onChange={(e) => setVeterinario(e.target.value)}
                                className="selectFormularioCita"
                            >
                                <option value="">Seleccionar</option>
                                {medicosFiltrados.map(v => (
                                    <option key={v.idVeterinario} value={v.idVeterinario}>
                                        {v.nombre} - {v.especialidad}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="filaGridCita">
                        <div className="grupoFormularioCita">
                            <label>Fecha/Hora Inicio<span className="asterisco">*</span></label>
                            <input 
                                type="datetime-local" 
                                min={fechaActual}
                                value={fechaHoraInicio}
                                onChange={(e) => {
                                    e.target.setCustomValidity('');
                                    setFechaHoraInicio(e.target.value);
                                }}
                                onInvalid={(e) => {
                                    e.target.setCustomValidity('Escoge una fecha u hora de trabajo valido ');
                                }}
                                className="inputFormularioCita"
                            />
                        </div>

                        <div className="grupoFormularioCita">
                            <label>Fecha/Hora Fin<span className="asterisco">*</span></label>
                            <input 
                                type="datetime-local" 
                                value={fechaHoraFin}
                                readOnly
                                className="inputFormularioCita inputDeshabilitado"
                                title="Se calcula automáticamente"
                            />
                        </div>

                        {Number(servicio) === 2 ? (
                            <div className="grupoFormularioCita">
                                <label>Tipo de Vacuna<span className="asterisco">*</span></label>
                                <select 
                                    value={tipoVacuna} 
                                    onChange={(e) => setTipoVacuna(e.target.value)}
                                    className="selectFormularioCita"
                                >
                                    <option value="">Seleccionar</option>
                                    {tiposVacunas.map(v => (
                                        <option key={v} value={v}>{v}</option>
                                    ))}
                                </select>
                            </div>
                        ) : (
                            <div className="grupoFormularioCita">
                                {/* Espaciador vacío para mantener la cuadrícula de 3 columnas */}
                            </div>
                        )}
                    </div>

                    <div className="grupoFormularioCita anchoTotal">
                        <label>Descripción:</label>
                        <textarea 
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="textareaFormularioCita"
                            placeholder="Detalles adicionales sobre el motivo de la cita..."
                        />
                    </div>

                    <div className="pieModalCitaAncho">
                        <button type="button" className="btnCancelarCitaColor" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btnGuardarCitaColor">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioNuevaCitaModal;
