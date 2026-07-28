import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './DashboardEstilos.css';

const DashboardVeterinario = () => {
    // Dummy data para el próximo paciente
    const [proximoPaciente, setProximoPaciente] = useState(null);
    const [cargandoPaciente, setCargandoPaciente] = useState(true);

    const [citasPendientes, setCitasPendientes] = useState([
        { id: 1, hora: '11:00 AM', nombre: 'Luna', especie: 'Gato', raza: 'Siamés', servicio: 'Consulta general' },
        { id: 2, hora: '11:30 AM', nombre: 'Toby', especie: 'Perro', raza: 'Golden Retriever', servicio: 'Vacunación (Séxtuple)' },
        { id: 3, hora: '12:15 PM', nombre: 'Rocky', especie: 'Perro', raza: 'Mestizo', servicio: 'Limpieza dental' },
        { id: 4, hora: '1:00 PM', nombre: 'Milo', especie: 'Conejo', raza: 'Enano', servicio: 'Revisión de control' }
    ]);

    const [kpis, setKpis] = useState({
        citasDeHoy: 0,
        citasPorConfirmar: 0,
        citasCanceladas: 0,
        nuevosPacientes: 0
    });
    const [cargandoKpis, setCargandoKpis] = useState(true);

    useEffect(() => {
        // SIMULACIÓN: Preparando el terreno para conectar con el backend
        const obtenerKpis = async () => {
            try {
                // En el futuro, esto se reemplazará por:
                // const response = await axios.get('TU_URL_DEL_BACKEND/api/veterinario/kpis');
                // setKpis(response.data);
                
                // Simulación de retraso de red (1 segundo)
                setTimeout(() => {
                    setKpis({
                        citasDeHoy: 8,
                        citasPorConfirmar: 3,
                        citasCanceladas: 1,
                        nuevosPacientes: 14
                    });
                    setCargandoKpis(false);
                }, 1000);
            } catch (error) {
                console.error("Error al cargar KPIs:", error);
                setCargandoKpis(false);
            }
        };

        const obtenerProximoPaciente = async () => {
            try {
                // En el futuro, esto se reemplazará por:
                // const response = await axios.get('TU_URL_DEL_BACKEND/api/veterinario/proxima-cita');
                // setProximoPaciente(response.data);
                
                // Simulación de retraso de red (1.5 segundos)
                setTimeout(() => {
                    setProximoPaciente({
                        nombre: 'Max',
                        especie: 'Perro',
                        raza: 'Maltes',
                        fechaHora: 'Hoy, 10:00 AM',
                        servicio: 'Vacunación (Rabia)',
                        dueno: 'Rodriguez Juarez Jose Daniel'
                    });
                    setCargandoPaciente(false);
                }, 1500);
            } catch (error) {
                console.error("Error al cargar el próximo paciente:", error);
                setCargandoPaciente(false);
            }
        };

        obtenerKpis();
        obtenerProximoPaciente();
    }, []);

    // Función para manejar la cancelación de la cita
    const handleCancelarCita = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: `¿Deseas cancelar la cita de ${proximoPaciente.nombre}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff8b6a',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, cancelar cita',
            cancelButtonText: 'No, mantener'
        }).then((result) => {
            if (result.isConfirmed) {
                // SIMULACIÓN: Preparando el terreno para conectar con el backend
                // En el futuro, aquí irá:
                // await axios.put(`TU_URL_DEL_BACKEND/api/citas/${proximoPaciente.id}/cancelar`);
                // await obtenerProximoPaciente(); // Volver a consultar la BD para traer al que sigue
                
                Swal.fire({
                    title: '¡Cancelada!',
                    text: 'La cita ha sido cancelada correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#ff8b6a'
                });

                // Simulamos la recarga de la tarjeta consultando al backend por el siguiente paciente
                setCargandoPaciente(true);
                
                setTimeout(() => {
                    // Simulamos que el backend nos devuelve a "Luna" como la siguiente cita
                    setProximoPaciente({
                        nombre: 'Luna',
                        especie: 'Gato',
                        raza: 'Siamés',
                        fechaHora: 'Hoy, 11:30 AM',
                        servicio: 'Consulta General',
                        dueno: 'Ana Martinez Lopez'
                    });
                    setCargandoPaciente(false);
                }, 1500);
            }
        });
    };

    return (
        <div className="dashboard-veterinario-container">
            <h1 className="dashboard-titulo">¡Bienvenido de nuevo, Miguel Alonso!</h1>

            {/* KPIs */}
            <div className="kpis-grid">
                <div className="kpi-card">
                    <span className="kpi-title">Citas de hoy</span>
                    <span className="kpi-value">{cargandoKpis ? '...' : kpis.citasDeHoy}</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-title">Citas por confirmar</span>
                    <span className="kpi-value">{cargandoKpis ? '...' : kpis.citasPorConfirmar}</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-title">Citas canceladas hoy</span>
                    <span className="kpi-value">{cargandoKpis ? '...' : kpis.citasCanceladas}</span>
                </div>
                <div className="kpi-card">
                    <span className="kpi-title">Nuevos pacientes (mes)</span>
                    <span className="kpi-value">{cargandoKpis ? '...' : kpis.nuevosPacientes}</span>
                </div>
            </div>

            {/* Contenido Principal Grid */}
            <div className="main-content-grid">
                {/* Proximo Paciente */}
                <div className="proximo-paciente-card">
                    <h2 className="section-subtitle">Proximo Paciente</h2>
                    {cargandoPaciente ? (
                        <p style={{ color: '#64748b', fontStyle: 'italic' }}>Buscando próxima cita en la base de datos...</p>
                    ) : proximoPaciente ? (
                        <div className="paciente-info-container">
                            <div className="paciente-avatar"></div>
                            <div className="paciente-detalles">
                                <h3 className="paciente-nombre">
                                    {proximoPaciente.nombre} ({proximoPaciente.especie}, {proximoPaciente.raza}) - {proximoPaciente.fechaHora}
                                </h3>
                                <p className="paciente-dato"><strong>Servicio:</strong> {proximoPaciente.servicio}</p>
                                <p className="paciente-dato"><strong>Dueño:</strong> {proximoPaciente.dueno}</p>
                                
                                <div className="paciente-acciones">
                                    <button className="btn-cancelar" onClick={handleCancelarCita}>Cancelar</button>
                                    <button className="btn-detalles">Ver detalles</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p style={{ color: '#64748b' }}>No tienes citas programadas próximamente.</p>
                    )}
                </div>

                {/* Accesos Directos */}
                <div className="accesos-directos-card">
                    <h2 className="section-subtitle">Accesos directos</h2>
                    <div className="botones-accesos">
                        <button className="btn-acceso">Nuevo paciente</button>
                        <button className="btn-acceso">Agendar cita</button>
                    </div>
                </div>
            </div>

            {/* Citas Pendientes */}
            <div className="citas-pendientes-section">
                <h2 className="section-subtitle">Citas pendientes</h2>
                <div className="citas-lista">
                    {citasPendientes.map((cita) => (
                        <div key={cita.id} className="cita-item">
                            <span className="cita-hora">{cita.hora}</span>
                            
                            <div className="cita-info-mascota">
                                <div className="cita-detalles-mascota">
                                    <h4 className="cita-nombre">{cita.nombre}</h4>
                                    <p className="cita-raza">({cita.especie}, {cita.raza})</p>
                                </div>
                            </div>
                            
                            <span className="cita-servicio">{cita.servicio}</span>
                            
                            <div className="cita-acciones">
                                <button className="btn-atender">Atender</button>
                                <button className="btn-detalles-sm">Ver detalles</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardVeterinario;
