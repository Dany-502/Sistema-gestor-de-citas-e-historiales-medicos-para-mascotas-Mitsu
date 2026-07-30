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
import { citaService, mascotaService } from '../../../services/api';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
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
                // Si no hay citas, simplemente dejamos el array vacío en lugar de mocks
                setCitas([]);
            } else {
                setCitas(citasFormateadas);
            }
        } catch (err) {
            console.error("Error al cargar citas de la agenda:", err);
            setCitas([]);
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

    const handleCancelarCita = async (idCita) => {
        setModalResumenAbierto(false);
        try {
            await citaService.cancelarCita(idCita);
            Swal.fire({
                icon: 'success',
                title: 'Cita cancelada',
                text: 'La cita ha sido cancelada exitosamente.',
                confirmButtonColor: '#0284c7'
            });
            setCitas(prev => prev.map(c => c.idCita === idCita ? { ...c, estado: 'Cancelada' } : c));
        } catch (err) {
            Swal.fire('Error', 'No se pudo cancelar la cita: ' + err.message, 'error');
        }
    };

    const handleCompletarCita = async (idCita) => {
        setModalResumenAbierto(false);
        try {
            await citaService.actualizarEstado(idCita, 'Realizada');
            Swal.fire({
                icon: 'success',
                title: 'Cita Completada',
                text: 'La cita ha sido marcada como realizada.',
                confirmButtonColor: '#0284c7'
            });
            setCitas(prev => prev.map(c => c.idCita === idCita ? { ...c, estado: 'Realizada' } : c));
        } catch (err) {
            Swal.fire('Error', 'No se pudo completar la cita: ' + err.message, 'error');
        }
    };

    const handleConfirmarCita = async (cita) => {
        // En AgendaVeterinario, el objeto cita que viene del modal de Resumen ya es el evento
        const idCita = cita.idCita;
        try {
            await citaService.actualizarEstado(idCita, 'Confirmada');
            // Swal fire is handled in ResumenCitaModal for confirmation success
            setCitas(prev => prev.map(c => c.idCita === idCita ? { ...c, estado: 'Confirmada' } : c));
        } catch (err) {
            Swal.fire('Error', 'No se pudo confirmar la cita: ' + err.message, 'error');
        }
    };

    const handleIrExpediente = async (cita) => {
        setModalResumenAbierto(false);
        navigate('/veterinario/expedientes');
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
                onConfirmarCita={handleConfirmarCita}
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
