import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/dist/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MisCitasEstilos.css';
import FormularioNuevaCitaModal from './FormularioNuevaCitaModal';
import ResumenCitaModal from './ResumenCitaModal';
import Swal from 'sweetalert2';

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

    // Citas simuladas iniciales
    const [citas, setCitas] = useState(() => {
        const hoy = new Date();
        return [
            {
                idCita: 1,
                mascotaId: '#MX4052',
                nombreMascota: 'Max',
                nombreVeterinario: 'Dr. Juan Pérez',
                nombreServicio: 'Consulta General',
                start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1, 10, 0), // Mañana 10:00 AM
                end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1, 11, 0), // Mañana 11:00 AM
                descripcion: 'Revisión mensual de control de peso.',
                estado: 'Confirmada'
            },
            {
                idCita: 2,
                mascotaId: '#CH1108',
                nombreMascota: 'Chloe',
                nombreVeterinario: 'Dra. María López',
                nombreServicio: 'Vacunación',
                start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 3, 15, 0), // En 3 días 3:00 PM
                end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 3, 15, 30), // En 3 días 3:30 PM
                descripcion: 'Vacuna anual contra la rabia.',
                estado: 'Pendiente'
            },
            {
                idCita: 3,
                mascotaId: '#MX4052',
                nombreMascota: 'Max',
                nombreVeterinario: 'Dr. Carlos Ruiz',
                nombreServicio: 'Limpieza Dental',
                start: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1, 12, 0), // Ayer 12:00 PM
                end: new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() - 1, 13, 30), // Ayer 1:30 PM
                descripcion: 'Limpieza dental y remoción de sarro.',
                estado: 'Confirmada'
            }
        ];
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 1200);
        return () => clearTimeout(timer);
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
    const handleCancelarCita = (idCita) => {
        // Aquí iría la petición HTTP al Backend: PUT /api/citas/{id}/cancelar
        setCitas(citas.map(c => 
            c.idCita === idCita ? { ...c, estado: 'Cancelada' } : c
        ));
        setModalResumenAbierto(false);
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

    // Mapear campos para react-big-calendar
    const eventosMapeados = citasFiltradas.map(c => ({
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
                onClose={() => setModalAbierto(false)}
                onSave={(nueva) => setCitas([...citas, nueva])}
                citasProgramadas={citas}
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
