import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/dist/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MisCitasEstilos.css';
import FormularioNuevaCitaModal from './FormularioNuevaCitaModal';
import ResumenCitaModal from './ResumenCitaModal';
import Swal from 'sweetalert2';
import { citaService } from '../../../services/api';

moment.locale('es');
const localizer = momentLocalizer(moment);

const MisCitas = () => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('');
    const [filtroMascota, setFiltroMascota] = useState('');
    const [filtroServicio, setFiltroServicio] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    const [modalResumenAbierto, setModalResumenAbierto] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [vistaCalendario, setVistaCalendario] = useState('month');
    const [fechaCalendario, setFechaCalendario] = useState(new Date());
    const [veterinarioInicial, setVeterinarioInicial] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state) {
            if (location.state.preselectedVeterinario) {
                setVeterinarioInicial(location.state.preselectedVeterinario);
                setModalAbierto(true);
            } else if (location.state.openModal) {
                setModalAbierto(true);
            }
            
            // Clean up state so a refresh doesn't reopen it
            if (location.state.preselectedVeterinario || location.state.openModal) {
                navigate('.', { replace: true, state: {} });
            }
        }
    }, [location.state, navigate]);

    const [citas, setCitas] = useState([]);

    const cargarCitas = async () => {
        try {
            setCargando(true);
            const datos = await citaService.obtenerMisCitas();
            const citasMapeadas = datos.map(c => ({
                idCita: c.idCita,
                mascotaId: c.mascotaId,
                nombreMascota: c.nombreMascota,
                nombreVeterinario: c.nombreVeterinario,
                nombreServicio: c.nombreServicio,
                start: new Date(c.fechaHoraInicio),
                end: new Date(c.fechaHoraFin),
                descripcion: c.descripcion || '',
                estado: c.estado || 'Pendiente'
            }));
            setCitas(citasMapeadas);
        } catch (err) {
            console.error("Error al cargar citas:", err);
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

    // Agregar colores específicos a los eventos de manera dinámica
    const eventStyleGetter = (event) => {
        let claseEstado = 'evento-pendiente';
        if (event.estado === 'Confirmada') claseEstado = 'evento-confirmada';
        else if (event.estado === 'Realizada') claseEstado = 'evento-realizada';
        else if (event.estado === 'Cancelada') claseEstado = 'evento-cancelada';

        return {
            className: claseEstado
        };
    };

    // Pintar las celdas de horarios no laborales (antes de las 9am, después de las 6pm)
    const slotStyleGetter = (date) => {
        const hora = date.getHours();
        if (hora < 9 || hora >= 20) {
            return {
                className: 'hora-no-laboral'
            };
        }
        return {};
    };

    // Al hacer clic en un evento
    const handleSelectEvent = (event) => {
        setCitaSeleccionada(event);
        setModalResumenAbierto(true);
    };

    // Al cancelar una cita desde el modal de resumen
    const handleCancelarCita = async (idCita) => {
        try {
            await citaService.cancelarCita(idCita);
            await cargarCitas();
            setModalResumenAbierto(false);
            Swal.fire({
                icon: 'success',
                title: 'Cita cancelada',
                text: 'La cita ha sido cancelada exitosamente.',
                confirmColor: '#0284c7'
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'No se pudo cancelar la cita.',
                confirmColor: '#0284c7'
            });
        }
    };

    // Lógica de filtrado de citas
    const citasFiltradas = citas.filter((cita) => {
        const coincideBusqueda =
            cita.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.nombreVeterinario.toLowerCase().includes(busqueda.toLowerCase()) ||
            cita.nombreServicio.toLowerCase().includes(busqueda.toLowerCase());

        const coincideEstado = filtroEstado ? cita.estado === filtroEstado : true;
        const coincideMascota = filtroMascota ? cita.mascotaId === filtroMascota : true;
        const coincideServicio = filtroServicio ? cita.nombreServicio === filtroServicio : true;

        return coincideBusqueda && coincideEstado && coincideMascota && coincideServicio;
    });

    // Mapear campos para react-big-calendar y ocultar canceladas si hay otra cita a la misma hora
    const eventosMapeados = citasFiltradas.filter(c => {
        if (c.estado === 'Cancelada') {
            const time = new Date(c.start).getTime();
            // Buscar si hay otra cita NO cancelada exactamente a la misma hora
            const tieneCitaValida = citasFiltradas.some(otra => 
                otra.estado !== 'Cancelada' && 
                new Date(otra.start).getTime() === time
            );
            return !tieneCitaValida; // Si existe otra, se oculta la cancelada
        }
        return true;
    }).map(c => ({
        ...c,
        title: `${c.nombreMascota} - ${c.nombreServicio}`
    }));

    return (
        <div className="contenedorMisCitas">
            <div className="cabeceraCitas">
                <div className="textosCabecera">
                    <h2 className="tituloCitas">Mis Citas</h2>
                    <p className="subtituloCitas">Visualiza y agenda las visitas al veterinario.</p>
                </div>
                <button className="botonAgendarCita" onClick={() => setModalAbierto(true)}>
                    Agendar Nueva Cita
                </button>
            </div>

            {/* KPIs */}
            <div className="panelKpiCitas">
                <div className="kpiCardCitas">
                    <span className="kpiLabel">Citas programadas</span>
                    <span className="kpiValue">{citas.filter(c => c.estado === 'Confirmada' || c.estado === 'Pendiente').length}</span>
                </div>
                <div className="kpiCardCitas">
                    <span className="kpiLabel">Pendientes de confirmación</span>
                    <span className="kpiValue">{citas.filter(c => c.estado === 'Pendiente').length}</span>
                </div>
            </div>

            {/* Filtros */}
            <div className="barraHerramientasCitas">
                <input
                    type="text"
                    placeholder="Buscar por mascota, médico o servicio..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="buscadorCitas"
                />

                <div className="filtrosCitas">
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

                    <select
                        value={filtroServicio}
                        onChange={(e) => setFiltroServicio(e.target.value)}
                        className="selectFiltroCitas"
                    >
                        <option value="">Todos los Servicios</option>
                        <option value="Consulta General">Consulta General</option>
                        <option value="Vacunación">Vacunación</option>
                        <option value="Cirugía">Cirugía</option>
                        <option value="Limpieza Dental">Limpieza Dental</option>
                    </select>
                </div>
            </div>

            {cargando ? (
                <div className="estadoCargandoMedicos">
                    <div className="spinnerMedicos"></div>
                    <p>Obteniendo citas del servidor...</p>
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

            <FormularioNuevaCitaModal
                isOpen={modalAbierto}
                onClose={() => {
                    setModalAbierto(false);
                    setVeterinarioInicial('');
                }}
                onSave={cargarCitas}
                citasProgramadas={citas}
                initialVeterinario={veterinarioInicial}
            />

            <ResumenCitaModal
                isOpen={modalResumenAbierto}
                onClose={() => setModalResumenAbierto(false)}
                cita={citaSeleccionada}
                onCancel={handleCancelarCita}
            />
        </div>
    );
};

export default MisCitas;
