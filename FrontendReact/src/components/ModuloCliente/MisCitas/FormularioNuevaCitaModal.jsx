import React, { useState, useEffect } from 'react';
import './FormularioNuevaCitaModalEstilos.css';
import Swal from 'sweetalert2';
import iconoPortapapeles from '../../../assets/iconos/portapapeles.png';
import { mascotaService, veterinarioService, servicioService, citaService } from '../../../services/api';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const FormularioNuevaCitaModal = ({ isOpen, onClose, onSave, citasProgramadas = [] }) => {
    const [fechaHoraInicio, setFechaHoraInicio] = useState(null);
    const [fechaHoraFin, setFechaHoraFin] = useState(null);
    const [mascota, setMascota] = useState('');
    const [servicio, setServicio] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [tipoVacuna, setTipoVacuna] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [mascotasDisponibles, setMascotasDisponibles] = useState([]);
    const [veterinariosDisponibles, setVeterinariosDisponibles] = useState([]);
    const [serviciosDisponibles, setServiciosDisponibles] = useState([]);

    const tiposVacunas = [
        'Antirrábica',
        'Séxtuple',
        'Parvovirus',
        'Leucemia Felina',
        'Triple Felina'
    ];

    useEffect(() => {
        if (isOpen) {
            const cargarOpciones = async () => {
                try {
                    const [mascotasData, vetsData, servsData] = await Promise.all([
                        mascotaService.obtenerMascotas().catch(() => [
                            { idMascota: 1, nombreMascota: 'Luna', especie: 'Gato', raza: 'Siamés', color: 'Blanco' },
                            { idMascota: 2, nombreMascota: 'Max', especie: 'Perro', raza: 'Bulldog', color: 'Café' }
                        ]),
                        veterinarioService.obtenerVeterinarios().catch(() => [
                            { idVeterinario: 1, nombre: 'Miguel', apPaterno: 'Alonso', especialidad: 'Cirujano' },
                            { idVeterinario: 2, nombre: 'Ana', apPaterno: 'Gomez', especialidad: 'Medicina General' }
                        ]),
                        servicioService.obtenerServicios().catch(() => [
                            { idServicio: 1, nombreServicio: 'Consulta General', duracionTiempo: 30 },
                            { idServicio: 2, nombreServicio: 'Vacunación', duracionTiempo: 15 },
                            { idServicio: 3, nombreServicio: 'Cirugía', duracionTiempo: 120 }
                        ])
                    ]);
                    setMascotasDisponibles(mascotasData.map(m => ({
                        idMascota: m.id_Mascota || m.idMascota || m.id,
                        nombre: m.NombreMascota || m.nombreMascota || m.nombre,
                        especie: m.Especie || m.especie,
                        raza: m.Raza || m.raza,
                        color: m.Color || m.color
                    })));
                    setVeterinariosDisponibles(vetsData.map(v => ({
                        idVeterinario: v.idVeterinario,
                        nombre: `${v.nombre} ${v.apPaterno}`,
                        especialidad: v.especialidad || 'General'
                    })));
                    setServiciosDisponibles(servsData.map(s => ({
                        idServicio: s.idServicio,
                        nombreServicio: s.nombreServicio,
                        duracion: s.duracionTiempo || 30
                    })));
                } catch (err) {
                    console.error("Error al cargar datos del modal:", err);
                }
            };
            cargarOpciones();
        }
    }, [isOpen]);

    useEffect(() => {
        if (fechaHoraInicio && servicio) {
            const servObj = serviciosDisponibles.find(s => s.idServicio === Number(servicio));
            if (servObj) {
                const end = new Date(fechaHoraInicio.getTime() + (servObj.duracion || 30) * 60000);
                setFechaHoraFin(end);
            }
        } else {
            setFechaHoraFin(null);
        }
    }, [fechaHoraInicio, servicio, serviciosDisponibles]);

    const obtenerHorasExcluidas = () => {
        if (!fechaHoraInicio) return [];
        // SIMULACIÓN: Estas son horas falsamente ocupadas para este médico
        return [
            setHours(setMinutes(fechaHoraInicio, 0), 10),
            setHours(setMinutes(fechaHoraInicio, 30), 14)
        ];
    };

    const medicosFiltrados = veterinariosDisponibles;

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!fechaHoraInicio || !mascota || !servicio || !veterinario) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor, llena todos los campos obligatorios (*).',
                icon: 'warning',
                confirmButtonColor: '#ff8b6a'
            });
            return;
        }

        let descripcionFinal = descripcion;
        if (tipoVacuna) {
            descripcionFinal = `Vacuna solicitada: ${tipoVacuna}.\n${descripcion}`;
        }

        try {
            await citaService.crearCita({
                mascotaId: mascota,
                veterinarioId: Number(veterinario),
                servicioId: Number(servicio),
                fechaHoraInicio: fechaHoraInicio.toISOString(),
                descripcion: descripcionFinal
            });

            if (onSave) {
                await onSave();
            }

            Swal.fire({
                title: '¡Cita Programada!',
                text: 'Tu cita ha sido agendada con éxito.',
                icon: 'success',
                confirmButtonColor: '#17c3b2',
                timer: 2500
            });

            setFechaHoraInicio(null);
            setFechaHoraFin(null);
            setMascota('');
            setServicio('');
            setVeterinario('');
            setTipoVacuna('');
            setDescripcion('');

            onClose();
        } catch (error) {
            Swal.fire({
                title: 'Error al agendar',
                text: error.message || 'No se pudo reservar la cita.',
                icon: 'error',
                confirmButtonColor: '#ff8b6a'
            });
        }
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
                                {serviciosDisponibles.map(s => (
                                    <option key={s.idServicio} value={s.idServicio}>
                                        {s.nombreServicio} ({s.duracion} min)
                                    </option>
                                ))}
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
                            <DatePicker
                                selected={fechaHoraInicio}
                                onChange={(date) => setFechaHoraInicio(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                timeCaption="Hora"
                                dateFormat="MMMM d, yyyy h:mm aa"
                                minDate={new Date()}
                                minTime={setHours(setMinutes(new Date(), 0), 9)}
                                maxTime={setHours(setMinutes(new Date(), 0), 20)}
                                excludeTimes={veterinario ? obtenerHorasExcluidas() : []}
                                className="inputFormularioCita"
                                placeholderText={veterinario ? "Selecciona día y hora" : "Elige un médico primero"}
                                disabled={!veterinario}
                            />
                        </div>

                        <div className="grupoFormularioCita">
                            <label>Fecha/Hora Fin<span className="asterisco">*</span></label>
                            <DatePicker
                                selected={fechaHoraFin}
                                readOnly
                                showTimeSelect
                                timeFormat="HH:mm"
                                dateFormat="h:mm aa"
                                className="inputFormularioCita inputDeshabilitado"
                                placeholderText="Auto calculado"
                                disabled
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
