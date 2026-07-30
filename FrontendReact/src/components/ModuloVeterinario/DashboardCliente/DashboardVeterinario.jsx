import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ResumenCitaModal from '../../ModuloCliente/MisCitas/ResumenCitaModal';
import CarnetMascotaModal from '../../ModuloCliente/MisMascotas/CarnetMascotaModal';
import TarjetasKpi from './TarjetasKpi';
import CarruselProximosPacientes from './CarruselProximosPacientes';
import ListaCitasPendientes from './ListaCitasPendientes';
import { citaService, mascotaService } from '../../../services/api';
import { useNavigate } from 'react-router-dom';
import './DashboardEstilos.css';

const DashboardVeterinario = () => {
    const [proximosPacientes, setProximosPacientes] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cargandoPaciente, setCargandoPaciente] = useState(true);

    const [citasPendientes, setCitasPendientes] = useState([]);
    const [todasMascotas, setTodasMascotas] = useState([]);
    const navigate = useNavigate();

    const [kpis, setKpis] = useState({
        citasDeHoy: 0,
        citasPorConfirmar: 0,
        citasCanceladas: 0,
        nuevosPacientes: 0
    });
    const [cargandoKpis, setCargandoKpis] = useState(true);

    // Estados para el Modal
    const [modalAbierto, setModalAbierto] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);

    const abrirModalDetalles = (cita) => {
        // Adaptamos la cita al formato que espera ResumenCitaModal
        const citaAdaptada = {
            idCita: cita.id,
            nombreMascota: `${cita.nombre} (${cita.especie}, ${cita.raza})`,
            nombreVeterinario: 'Miguel Alonso', // El veterinario en sesión
            nombreServicio: cita.servicio,
            start: new Date(), // Simulado para que moment() no falle
            notas: 'El dueño solicita revisión general.',
            estado: 'Pendiente'
        };
        setCitaSeleccionada(citaAdaptada);
        setModalAbierto(true);
    };

    const handleCancelarDesdeModal = async (idCita) => {
        setModalAbierto(false);
        try {
            await citaService.cancelarCita(idCita);
            setCitasPendientes(prev => prev.filter(c => c.idCita !== idCita));
            cargarCitas();
        } catch (error) {
            Swal.fire('Error', 'No se pudo cancelar la cita: ' + error.message, 'error');
        }
    };

    const pacienteActual = proximosPacientes[indiceActual] || null;

    const handleAbrirExpediente = async (idMascota) => {
        navigate('/veterinario/expedientes');
    };


    const cargarCitas = async () => {
        try {
            setCargandoKpis(true);
            setCargandoPaciente(true);
            const citas = await citaService.obtenerTodas();
            
            const hoyLocal = new Date();
            const hoyStr = `${hoyLocal.getFullYear()}-${String(hoyLocal.getMonth() + 1).padStart(2, '0')}-${String(hoyLocal.getDate()).padStart(2, '0')}`;

            // KPIs
            const citasDeHoyCount = citas.filter(c => c.fechaHoraInicio && c.fechaHoraInicio.startsWith(hoyStr) && c.estado !== 'Cancelada').length;
            const citasPorConfirmarCount = citas.filter(c => c.estado === 'Pendiente').length;
            const citasCanceladasCount = citas.filter(c => c.estado === 'Cancelada').length;
            
            setKpis({
                citasDeHoy: citasDeHoyCount,
                citasPorConfirmar: citasPorConfirmarCount,
                citasCanceladas: citasCanceladasCount,
                nuevosPacientes: 0
            });

            // Próximos pacientes (Confirmadas de hoy)
            const pacientesHoy = citas
                .filter(c => c.fechaHoraInicio && c.fechaHoraInicio.startsWith(hoyStr) && c.estado === 'Confirmada')
                .map(c => ({
                    id: c.idCita,
                    idMascota: c.mascotaId,
                    nombre: c.nombreMascota,
                    especie: c.especie || '',
                    raza: c.raza || '',
                    hora: new Date(c.fechaHoraInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                    servicio: c.nombreServicio,
                    dueno: 'Registrado'
                }));
            setProximosPacientes(pacientesHoy);

            // Citas Pendientes
            const pendientes = citas
                .filter(c => c.estado === 'Pendiente')
                .map(c => ({
                    id: c.idCita,
                    fecha: new Date(c.fechaHoraInicio).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
                    hora: new Date(c.fechaHoraInicio).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
                    nombre: c.nombreMascota,
                    especie: c.especie || '',
                    raza: c.raza || '',
                    servicio: c.nombreServicio
                }));
            setCitasPendientes(pendientes);
            
            setCargandoKpis(false);
            setCargandoPaciente(false);
        } catch (error) {
            console.error("Error al cargar citas:", error);
            setCargandoKpis(false);
            setCargandoPaciente(false);
        }
    };

    useEffect(() => {
        cargarCitas();
    }, []);

    const handleCancelarCita = () => {
        if (!pacienteActual) return;
        
        Swal.fire({
            title: '¿Seguro que deseas cancelar?',
            text: `Vas a cancelar la cita confirmada de ${pacienteActual.nombre}.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await citaService.cancelarCita(pacienteActual.id);
                    Swal.fire({
                        title: '¡Cancelada!',
                        text: 'La cita ha sido cancelada correctamente.',
                        icon: 'success'
                    });
                    cargarCitas();
                    setIndiceActual(0);
                } catch (error) {
                    Swal.fire('Error', 'No se pudo cancelar la cita: ' + error.message, 'error');
                }
            }
        });
    };

    const handleConfirmarCita = (citaAConfirmar) => {
        Swal.fire({
            title: '¿Confirmar Cita?',
            text: `¿Deseas confirmar la cita de ${citaAConfirmar.nombre} para el ${citaAConfirmar.fecha} a las ${citaAConfirmar.hora}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#17c3b2',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Volver'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await citaService.actualizarEstado(citaAConfirmar.id, 'Confirmada');
                    Swal.fire({
                        title: '¡Confirmada!',
                        text: 'La cita ha sido confirmada exitosamente. El cliente será notificado.',
                        icon: 'success',
                        confirmButtonColor: '#17c3b2'
                    });
                    cargarCitas();
                } catch (error) {
                    Swal.fire('Error', 'No se pudo confirmar la cita: ' + error.message, 'error');
                }
            }
        });
    };

    return (
        <div className="dashboard-veterinario-container">
            <h1 className="dashboard-titulo">¡Bienvenido de nuevo, Miguel Alonso!</h1>

            <TarjetasKpi 
                kpis={kpis} 
                cargandoKpis={cargandoKpis} 
            />

            <div className="dashboard-grid">
                <CarruselProximosPacientes 
                    proximosPacientes={proximosPacientes}
                    indiceActual={indiceActual}
                    setIndiceActual={setIndiceActual}
                    cargandoPaciente={cargandoPaciente}
                    onCancelarCita={handleCancelarCita}
                    onAbrirExpediente={() => handleAbrirExpediente(pacienteActual?.idMascota)}
                />
            </div>

            <ListaCitasPendientes 
                citasPendientes={citasPendientes}
                onConfirmarCita={handleConfirmarCita}
                onAbrirDetalles={abrirModalDetalles}
            />

            {/* Modal de Detalles de Citas Pendientes */}
            <ResumenCitaModal 
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                cita={citaSeleccionada}
                onCancel={handleCancelarDesdeModal}
                onConfirmarCita={handleConfirmarCita}
                esVeterinario={true}
                onIrExpediente={handleAbrirExpediente}
            />
        </div>
    );
};

export default DashboardVeterinario;
