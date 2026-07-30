import React, { useState, useEffect } from 'react';
import '../../ModuloCliente/MisCitas/FormularioNuevaCitaModalEstilos.css'; // Reusing exact styles
import Swal from 'sweetalert2';
import iconoPortapapeles from '../../../assets/iconos/portapapeles.png';
import { clienteService, mascotaService, veterinarioService, servicioService, citaService } from '../../../services/api';
import DatePicker from 'react-datepicker';
import { setHours, setMinutes } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

const FormularioCitaAdminModal = ({ isOpen, onClose, onSave }) => {
    const [cliente, setCliente] = useState('');
    const [fechaHoraInicio, setFechaHoraInicio] = useState(null);
    const [fechaHoraFin, setFechaHoraFin] = useState(null);
    const [mascota, setMascota] = useState('');
    const [servicio, setServicio] = useState('');
    const [veterinario, setVeterinario] = useState('');
    const [tipoVacuna, setTipoVacuna] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const [clientesDisponibles, setClientesDisponibles] = useState([]);
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
                    const [clsData, vetsData, servsData] = await Promise.all([
                        clienteService.obtenerTodos().catch(() => [
                            { idCliente: 1, nombre: 'María Fernández', correo: 'maria@gmail.com' },
                            { idCliente: 2, nombre: 'Carlos Romero', correo: 'carlos@gmail.com' }
                        ]),
                        veterinarioService.obtenerVeterinarios().catch(() => [
                            { idVeterinario: 1, nombre: 'Miguel', apPaterno: 'Alonso', especialidad: 'Cirujano' },
                            { idVeterinario: 2, nombre: 'Ana', apPaterno: 'Gomez', especialidad: 'Medicina General' }
                        ]),
                        servicioService.obtenerServicios().catch(() => [
                            { idServicio: 1, nombreServicio: 'Consulta General', duracionTiempo: 30 },
                            { idServicio: 2, nombreServicio: 'Vacunación', duracionTiempo: 15 },
                            { idServicio: 3, nombreServicio: 'Desparasitación', duracionTiempo: 15 }
                        ])
                    ]);

                    setClientesDisponibles(clsData || []);
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
                    console.error("Error al cargar datos del modal admin:", err);
                }
            };
            cargarOpciones();
        }
    }, [isOpen]);

    // Load pets when client changes
    useEffect(() => {
        if (cliente) {
            // Mock pets based on client
            if (cliente === '1') {
                setMascotasDisponibles([
                    { idMascota: 1, nombre: 'Luna', especie: 'Gato', raza: 'Siamés', color: 'Blanco' },
                    { idMascota: 3, nombre: 'Pipo', especie: 'Pájaro', raza: 'Canario', color: 'Amarillo' }
                ]);
            } else if (cliente === '2') {
                setMascotasDisponibles([
                    { idMascota: 2, nombre: 'Max', especie: 'Perro', raza: 'Bulldog', color: 'Café' }
                ]);
            } else {
                setMascotasDisponibles([]);
            }
            setMascota(''); // Reset mascota
        } else {
            setMascotasDisponibles([]);
        }
    }, [cliente]);

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
        return [
            setHours(setMinutes(fechaHoraInicio, 0), 10),
            setHours(setMinutes(fechaHoraInicio, 30), 14)
        ];
    };

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!cliente || !fechaHoraInicio || !mascota || !servicio || !veterinario) {
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
                title: '¡Cita Confirmada (Admin)!',
                text: 'La cita ha sido agendada y autorizada exitosamente.',
                icon: 'success',
                confirmButtonColor: '#17c3b2',
                timer: 3000
            });

            setCliente('');
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
                        Agendar Cita (Administración)
                    </h3>
                </div>
                
                <form onSubmit={handleSubmit} className="formularioCitaAncho">
                    
                    <div className="filaGridCita">
                        <div className="grupoFormularioCita">
                            <label>Cliente<span className="asterisco">*</span></label>
                            <select 
                                value={cliente} 
                                onChange={(e) => setCliente(e.target.value)}
                                className="selectFormularioCita"
                            >
                                <option value="">Seleccionar</option>
                                {clientesDisponibles.map(c => (
                                    <option key={c.idCliente} value={c.idCliente}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="grupoFormularioCita">
                            <label>Mascota<span className="asterisco">*</span></label>
                            <select 
                                value={mascota} 
                                onChange={(e) => setMascota(e.target.value)}
                                className="selectFormularioCita"
                                disabled={!cliente}
                            >
                                <option value="">Seleccionar</option>
                                {mascotasDisponibles.map(m => (
                                    <option key={m.idMascota} value={m.idMascota}>
                                        {m.nombre} - {m.especie}, {m.raza}
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
                    </div>

                    <div className="filaGridCita">
                        <div className="grupoFormularioCita">
                            <label>Veterinario<span className="asterisco">*</span></label>
                            <select 
                                value={veterinario} 
                                onChange={(e) => setVeterinario(e.target.value)}
                                className="selectFormularioCita"
                            >
                                <option value="">Seleccionar</option>
                                {veterinariosDisponibles.map(v => (
                                    <option key={v.idVeterinario} value={v.idVeterinario}>
                                        {v.nombre} - {v.especialidad}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
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
                    </div>

                    <div className="filaGridCita">
                        {Number(servicio) === 2 && (
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
                        )}
                    </div>

                    <div className="grupoFormularioCita anchoTotal">
                        <label>Descripción / Notas Internas:</label>
                        <textarea 
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            className="textareaFormularioCita"
                            placeholder="Detalles de la cita... (Ej. El cliente solicita que no se use anestesia general)"
                        />
                    </div>

                    <div className="pieModalCitaAncho">
                        <button type="button" className="btnCancelarCitaColor" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btnGuardarCitaColor">Agendar Cita Confirmada</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioCitaAdminModal;
