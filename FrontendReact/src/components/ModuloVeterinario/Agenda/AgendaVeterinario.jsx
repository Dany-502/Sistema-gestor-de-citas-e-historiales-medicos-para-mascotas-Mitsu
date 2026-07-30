import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/dist/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './AgendaEstilos.css';
import ResumenCitaModal from '../../ModuloCliente/MisCitas/ResumenCitaModal';
import ConfigurarHorarioModal from './ConfigurarHorarioModal';
import FormularioCitaAdminModal from './FormularioCitaAdminModal';
import Swal from 'sweetalert2';
import { citaService } from '../../../services/api';

moment.locale('es');
const localizer = momentLocalizer(moment);

const AgendaVeterinario = ({ esAdmin = false }) => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroMedico, setFiltroMedico] = useState('');
    const [modalResumenAbierto, setModalResumenAbierto] = useState(false);
    const [modalHorarioAbierto, setModalHorarioAbierto] = useState(false);
    const [modalNuevaCitaAbierto, setModalNuevaCitaAbierto] = useState(false);
    const [horaApertura, setHoraApertura] = useState(9);
    const [horaCierre, setHoraCierre] = useState(20);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [vistaCalendario, setVistaCalendario] = useState('month');
    const [fechaCalendario, setFechaCalendario] = useState(new Date());

    const [citas, setCitas] = useState([]);

    const cargarCitas = async () => {
        setCargando(true);
        try {
            const data = await citaService.obtenerTodas();
            let citasFormateadas = (data || []).map(c => ({
                ...c,
                title: `${c.nombreMascota || 'Mascota'} - ${c.nombreServicio || 'Cita'}`,
                start: c.fechaHoraInicio ? new Date(c.fechaHoraInicio) : new Date(),
                end: c.fechaHoraFin ? new Date(c.fechaHoraFin) : new Date(new Date().getTime() + 30 * 60000),
            }));

            if (citasFormateadas.length === 0) {
                const hoy = new Date();
                const mañana = new Date(hoy);
                mañana.setDate(hoy.getDate() + 1);
                citasFormateadas = [
                    {
                        idCita: 1,
                        title: 'Luna (Gato, Siamés) - Consulta general',
                        nombreMascota: 'Luna (Gato, Siamés)',
                        nombreVeterinario: 'Dr. Alejandro Fernández',
                        nombreServicio: 'Consulta general',
                        start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 10, 0),
                        end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 11, 0),
                        descripcion: 'Dueño: María Fernández. Revisión de rutina.',
                        estado: 'Pendiente'
                    },
                    {
                        idCita: 2,
                        title: 'Max (Perro, Golden) - Revisión Dermatológica',
                        nombreMascota: 'Max (Perro, Golden)',
                        nombreVeterinario: 'Dr. Alejandro Fernández',
                        nombreServicio: 'Revisión Dermatológica',
                        start: new Date(mañana.getFullYear(), mañana.getMonth(), mañana.getDate(), 14, 30),
                        end: new Date(mañana.getFullYear(), mañana.getMonth(), mañana.getDate(), 15, 30),
                        descripcion: 'Dueño: Carlos Romero. Problemas de alergia en piel.',
                        estado: 'Confirmada'
                    }
                ];
            }
            setCitas(citasFormateadas);
        } catch (err) {
            console.error("Error al cargar citas de la agenda, usando datos demo:", err);
            const hoy = new Date();
            const mañana = new Date(hoy);
            mañana.setDate(hoy.getDate() + 1);

            const citasMock = [
                {
                    idCita: 1,
                    title: 'Luna (Gato, Siamés) - Consulta general',
                    nombreMascota: 'Luna (Gato, Siamés)',
                    nombreVeterinario: 'Dr. Alejandro Fernández',
                    nombreServicio: 'Consulta general',
                    start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 10, 0),
                    end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 11, 0),
                    descripcion: 'Dueño: María Fernández. Revisión de rutina.',
                    estado: 'Pendiente'
                },
                {
                    idCita: 2,
                    title: 'Max (Perro, Golden) - Revisión Dermatológica',
                    nombreMascota: 'Max (Perro, Golden)',
                    nombreVeterinario: 'Dr. Alejandro Fernández',
                    nombreServicio: 'Revisión Dermatológica',
                    start: new Date(mañana.getFullYear(), mañana.getMonth(), mañana.getDate(), 14, 30),
                    end: new Date(mañana.getFullYear(), mañana.getMonth(), mañana.getDate(), 15, 30),
                    descripcion: 'Dueño: Carlos Romero. Problemas de alergia en piel.',
                    estado: 'Confirmada'
                },
                {
                    idCita: 3,
                    nombreMascota: 'Pipo (Pájaro, Canario)',
                    nombreVeterinario: 'Ana Pérez',
                    nombreServicio: 'Corte de alas y uñas',
                    start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 12, 0),
                    end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 13, 0),
                    descripcion: 'Dueño: María Fernández. Chequeo general.',
                    estado: 'Confirmada'
                },
                {
                    idCita: 4,
                    nombreMascota: 'Michi (Gato, Persa)',
                    nombreVeterinario: 'Miguel Alonso',
                    nombreServicio: 'Vacunación',
                    start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 16, 0),
                    end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate(), 17, 0),
                    descripcion: 'Dueño: Laura Gutiérrez. Canceló por motivos personales.',
                    estado: 'Cancelada'
                }
            ];
            setCitas(citasMock);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    // Formatear los mensajes a español
    const mensajesEspanol = {
        allDay: 'Todo el día',
        previous: 'Anterior',
        next: 'Siguiente',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Cita',
        noEventsInRange: 'No hay citas en este rango.'
    };

    // Agregar colores específicos a los eventos
    const eventStyleGetter = (event) => {
        let claseEstado = 'evento-pendiente';
        if (event.estado === 'Confirmada') claseEstado = 'evento-confirmada';
        else if (event.estado === 'Realizada') claseEstado = 'evento-realizada';
        else if (event.estado === 'Cancelada') claseEstado = 'evento-cancelada';

        return {
            className: claseEstado
        };
    };

    const slotStyleGetter = (date) => {
        const hora = date.getHours();
        if (hora < horaApertura || hora >= horaCierre) {
            return {
                className: 'hora-no-laboral'
            };
        }
        return {};
    };

    const handleSelectEvent = (event) => {
        setCitaSeleccionada(event);
        setModalResumenAbierto(true);
    };

    const handleCancelarCita = (idCita) => {
        // SIMULACIÓN: Cancelar cita en el backend
        setModalResumenAbierto(false);
        Swal.fire({
            icon: 'success',
            title: 'Cita cancelada',
            text: 'La cita ha sido cancelada exitosamente.',
            confirmColor: '#0284c7'
        });
        // Simulamos la eliminación local
        setCitas(prev => prev.filter(c => c.idCita !== idCita));
    };

    const handleCompletarCita = (idCita) => {
        setModalResumenAbierto(false);
        // Simulamos el cambio de estado local
        setCitas(prev => prev.map(c =>
            c.idCita === idCita ? { ...c, estado: 'Realizada' } : c
        ));
    };

    const handleIrExpediente = (cita) => {
        setModalResumenAbierto(false);
        Swal.fire({
            icon: 'info',
            title: 'Redirigiendo...',
            text: `Aquí se redirigiría al expediente de ${cita.nombreMascota}.`,
            confirmColor: '#0284c7'
        });
        // En el futuro: navigate('/veterinario/expedientes', { state: { mascotaId: cita.mascotaId } })
    };

    const handleConfigurarHorario = () => {
        setModalHorarioAbierto(true);
    };

    const handleGuardarHorario = (apertura, cierre) => {
        setHoraApertura(apertura);
        setHoraCierre(cierre);
        setModalHorarioAbierto(false);
        Swal.fire({
            icon: 'success',
            title: 'Horario Actualizado',
            text: 'El calendario ahora refleja los nuevos horarios de la clínica.',
            confirmButtonColor: '#0284c7'
        });
    };

    const handleGuardarNuevaCitaAdmin = () => {
        // En el futuro: recargarCitas()
    };

    // Filtros
    const citasFiltradas = citas.filter((cita) => {
        const coincideBusqueda =
            cita.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.nombreServicio.toLowerCase().includes(busqueda.toLowerCase());

        const coincideEstado = filtroEstado ? cita.estado === filtroEstado : true;
        const coincideMedico = esAdmin && filtroMedico ? cita.nombreVeterinario === filtroMedico : true;

        return coincideBusqueda && coincideEstado && coincideMedico;
    });

    const eventosMapeados = citasFiltradas.map(c => ({
        ...c,
        title: `${c.nombreMascota} - ${c.nombreServicio}`
    }));

    return (
        <div className="contenedorMisCitas">
            <div className="cabeceraCitas">
                <div className="textosCabecera">
                    <h2 className="tituloCitas text-slate-900">
                        Agenda {esAdmin ? 'Administrador' : 'del Veterinario'}
                    </h2>
                    <p className="subtituloCitas">
                        {esAdmin ? 'Monitoreo de todas las citas y pacientes programados en la clínica.' : 'Administra tus citas y horarios de atención médica.'}
                    </p>
                </div>
                {esAdmin && (
                    <button
                        className="botonAgendarCita"
                        onClick={() => setModalNuevaCitaAbierto(true)}
                    >
                        Agendar Nueva Cita
                    </button>
                )}
            </div>

            {/* KPIs */}
            <div className="panelKpiCitas">
                <div className="kpiCardCitas">
                    <span className="kpiLabel">Citas hoy</span>
                    <span className="kpiValue">{citas.filter(c => c.start.getDate() === new Date().getDate() && (c.estado === 'Confirmada' || c.estado === 'Pendiente')).length}</span>
                </div>
                <div className="kpiCardCitas">
                    <span className="kpiLabel">{esAdmin ? 'Solicitudes Pendientes' : 'Por confirmar'}</span>
                    <span className="kpiValue text-orange-warning">{citas.filter(c => c.estado === 'Pendiente').length}</span>
                </div>
                {esAdmin ? (
                    <div className="kpiCardCitas">
                        <span className="kpiLabel text-red-danger">Citas Canceladas</span>
                        <span className="kpiValue text-red-danger">{citas.filter(c => c.estado === 'Cancelada').length}</span>
                    </div>
                ) : (
                    <div className="kpiCardCitas">
                        <span className="kpiLabel">Pacientes atendidos</span>
                        <span className="kpiValue text-blue-primary">{citas.filter(c => c.estado === 'Realizada').length}</span>
                    </div>
                )}
                <div className="kpiCardCitas">
                    <span className="kpiLabel">Total programadas</span>
                    <span className="kpiValue">{citas.filter(c => c.estado === 'Confirmada' || c.estado === 'Pendiente').length}</span>
                </div>
            </div>

            {/* Filtros */}
            <div className="barraHerramientasCitas">
                <input
                    type="text"
                    placeholder="Buscar paciente o servicio..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="buscadorCitas"
                />

                <div className="filtrosCitas flex-center-gap-10">
                    {esAdmin && (
                        <button
                            onClick={handleConfigurarHorario}
                            className="btn-configurar-horario"
                        >
                            ⚙️ Configurar Horario
                        </button>
                    )}
                    {esAdmin && (
                        <select
                            value={filtroMedico}
                            onChange={(e) => setFiltroMedico(e.target.value)}
                            className="selectFiltroCitas"
                        >
                            <option value="">Todos los Médicos</option>
                            <option value="Miguel Alonso">Miguel Alonso</option>
                            <option value="Ana Pérez">Ana Pérez</option>
                        </select>
                    )}
                    <select
                        value={filtroEstado}
                        onChange={(e) => setFiltroEstado(e.target.value)}
                        className="selectFiltroCitas"
                    >
                        <option value="">Todos los Estados</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Confirmada">Confirmada</option>
                        <option value="Realizada">Realizada</option>
                        <option value="Cancelada">Cancelada</option>
                    </select>
                </div>
            </div>

            {cargando ? (
                <div className="estadoCargandoMedicos">
                    <div className="spinnerMedicos"></div>
                    <p>Obteniendo tu agenda...</p>
                </div>
            ) : (
                <div className="calendarioContenedor">
                    <Calendar
                        localizer={localizer}
                        events={eventosMapeados}
                        startAccessor="start"
                        endAccessor="end"
                        messages={mensajesEspanol}
                        eventPropGetter={eventStyleGetter}
                        slotPropGetter={slotStyleGetter}
                        onSelectEvent={handleSelectEvent}
                        view={vistaCalendario}
                        onView={(nuevaVista) => setVistaCalendario(nuevaVista)}
                        date={fechaCalendario}
                        onNavigate={(nuevaFecha) => setFechaCalendario(nuevaFecha)}
                        views={['month', 'week', 'day']}
                    />
                </div>
            )}

            {/* Leyenda */}
            <div className="leyendaColoresCitas">
                <div className="itemLeyendaCitas">
                    <div className="indicadorColorCitas pendiente"></div>
                    <span>Pendiente</span>
                </div>
                <div className="itemLeyendaCitas">
                    <div className="indicadorColorCitas confirmada"></div>
                    <span>Confirmada</span>
                </div>
                <div className="itemLeyendaCitas">
                    <div className="indicadorColorCitas realizada"></div>
                    <span>Realizada</span>
                </div>
                <div className="itemLeyendaCitas">
                    <div className="indicadorColorCitas cancelada"></div>
                    <span>Cancelada</span>
                </div>
            </div>

            <ResumenCitaModal
                isOpen={modalResumenAbierto}
                onClose={() => setModalResumenAbierto(false)}
                cita={citaSeleccionada}
                onCancel={handleCancelarCita}
                esVeterinario={!esAdmin}
                esAdmin={esAdmin}
                onCompletarCita={handleCompletarCita}
                onIrExpediente={handleIrExpediente}
            />

            <ConfigurarHorarioModal
                isOpen={modalHorarioAbierto}
                onClose={() => setModalHorarioAbierto(false)}
                horaAperturaActual={horaApertura}
                horaCierreActual={horaCierre}
                onGuardar={handleGuardarHorario}
            />

            <FormularioCitaAdminModal
                isOpen={modalNuevaCitaAbierto}
                onClose={() => setModalNuevaCitaAbierto(false)}
                onSave={handleGuardarNuevaCitaAdmin}
            />
        </div>
    );
};

export default AgendaVeterinario;
