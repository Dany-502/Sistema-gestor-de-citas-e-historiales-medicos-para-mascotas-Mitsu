import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ResumenCitaModal from '../../ModuloCliente/MisCitas/ResumenCitaModal';
import CarnetMascotaModal from '../../ModuloCliente/MisMascotas/CarnetMascotaModal';
import TarjetasKpi from './TarjetasKpi';
import CarruselProximosPacientes from './CarruselProximosPacientes';
import ListaCitasPendientes from './ListaCitasPendientes';
import './DashboardEstilos.css';

const DashboardVeterinario = () => {
    // Dummy data para próximos pacientes (citas confirmadas del día)
    const [proximosPacientes, setProximosPacientes] = useState([]);
    const [indiceActual, setIndiceActual] = useState(0);
    const [cargandoPaciente, setCargandoPaciente] = useState(true);

    const [citasPendientes, setCitasPendientes] = useState([
        { id: 1, fecha: '28 Jul 2026', hora: '11:00 AM', nombre: 'Luna', especie: 'Gato', raza: 'Siamés', servicio: 'Consulta general' },
        { id: 2, fecha: '28 Jul 2026', hora: '11:30 AM', nombre: 'Toby', especie: 'Perro', raza: 'Golden Retriever', servicio: 'Vacunación (Séxtuple)' },
        { id: 3, fecha: '29 Jul 2026', hora: '12:15 PM', nombre: 'Rocky', especie: 'Perro', raza: 'Mestizo', servicio: 'Limpieza dental' },
        { id: 4, fecha: '15 Ago 2026', hora: '1:00 PM', nombre: 'Milo', especie: 'Conejo', raza: 'Enano', servicio: 'Revisión de control' },
        { id: 5, fecha: '16 Ago 2026', hora: '09:00 AM', nombre: 'Simba', especie: 'Gato', raza: 'Persa', servicio: 'Desparasitación' }
    ]);

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

    const handleCancelarDesdeModal = (idCita) => {
        setModalAbierto(false);
        // Simulamos la eliminación de la cita en la tabla
        setCitasPendientes(prev => prev.filter(c => c.id !== idCita));
    };

    // Estados para el Expediente (CarnetMascotaModal)
    const [carnetAbierto, setCarnetAbierto] = useState(false);
    
    const pacienteActual = proximosPacientes[indiceActual] || null;

    // Generar un DTO de mascota de prueba basado en el próximo paciente actual
    const mascotaExpediente = pacienteActual ? {
        idMascota: 1,
        nombreMascota: pacienteActual.nombre,
        especie: pacienteActual.especie,
        raza: pacienteActual.raza,
        sexo: 'Macho',
        fechaNacimiento: '10/05/2021',
        peso: '4.5 kg',
        color: 'Blanco',
        adultoResponsable: {
            nombreCliente: pacienteActual?.dueno || 'Sin dueño',
            telefonoContacto: '555-0192'
        },
        historialVacunas: [
            { id: 1, vacuna: 'Rabia', fecha: '15/02/2025', proxima: '15/02/2026', peso: '4.2 kg' }
        ],
        historialCitas: []
    } : null;

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

        // SIMULACIÓN: Obteniendo la lista de próximos pacientes (confirmados)
        const obtenerProximosPacientes = async () => {
            setCargandoPaciente(true);
            setTimeout(() => {
                setProximosPacientes([
                    {
                        id: 101,
                        nombre: 'Luna',
                        especie: 'Gato',
                        raza: 'Siamés',
                        hora: '10:00 AM',
                        servicio: 'Consulta general',
                        dueno: 'María Fernández'
                    },
                    {
                        id: 102,
                        nombre: 'Max',
                        especie: 'Perro',
                        raza: 'Bulldog',
                        hora: '10:30 AM',
                        servicio: 'Revisión de piel',
                        dueno: 'Carlos Romero'
                    },
                    {
                        id: 103,
                        nombre: 'Coco',
                        especie: 'Loro',
                        raza: 'Gris africano',
                        hora: '11:15 AM',
                        servicio: 'Corte de alas y uñas',
                        dueno: 'Ana Laura López'
                    }
                ]);
                setCargandoPaciente(false);
            }, 1500);
        };

        obtenerKpis();
        obtenerProximosPacientes();
    }, []);

    // Función para manejar la cancelación de la cita
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Cancelada!',
                    text: 'La cita ha sido cancelada correctamente.',
                    icon: 'success'
                });

                // Simulamos la eliminación del carrusel
                const nuevosPacientes = proximosPacientes.filter((_, index) => index !== indiceActual);
                setProximosPacientes(nuevosPacientes);
                
                // Si borramos el último de la lista y no era el índice 0, retrocedemos uno
                if (indiceActual >= nuevosPacientes.length && nuevosPacientes.length > 0) {
                    setIndiceActual(nuevosPacientes.length - 1);
                } else if (nuevosPacientes.length === 0) {
                    setIndiceActual(0);
                }
                
                // Actualizamos el KPI de canceladas
                setKpis(prev => ({
                    ...prev,
                    citasCanceladas: prev.citasCanceladas + 1
                }));
            }
        });
    };

    // Función para manejar la confirmación de la cita desde la tabla de pendientes
    const handleConfirmarCita = (citaAConfirmar) => {
        Swal.fire({
            title: '¿Confirmar Cita?',
            text: `¿Deseas confirmar la cita de ${citaAConfirmar.nombre} para el ${citaAConfirmar.fecha} a las ${citaAConfirmar.hora}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#17c3b2', // Un color verde/teal para confirmar
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Sí, confirmar',
            cancelButtonText: 'Volver'
        }).then((result) => {
            if (result.isConfirmed) {
                // SIMULACIÓN: Preparando para el backend
                // En el futuro, aquí irá:
                // await axios.put(`TU_URL_DEL_BACKEND/api/citas/${citaAConfirmar.id}/confirmar`);
                
                Swal.fire({
                    title: '¡Confirmada!',
                    text: 'La cita ha sido confirmada exitosamente. El cliente será notificado.',
                    icon: 'success',
                    confirmButtonColor: '#17c3b2'
                });

                // Simulamos que la cita desaparece de la lista de "pendientes"
                setCitasPendientes(prev => prev.filter(c => c.id !== citaAConfirmar.id));
                
                // SIMULAMOS que aparece en el carrusel (Opción B: actualización optimista)
                setProximosPacientes(prev => [
                    ...prev, 
                    {
                        id: citaAConfirmar.id,
                        nombre: citaAConfirmar.nombre,
                        especie: citaAConfirmar.especie,
                        raza: citaAConfirmar.raza,
                        hora: citaAConfirmar.hora,
                        servicio: citaAConfirmar.servicio,
                        dueno: 'Dueño de la BD' // Dato simulado porque no viene en la tabla de pendientes original
                    }
                ]);

                // Opcional: Actualizamos los KPIs visualmente para dar feedback inmediato
                setKpis(prev => ({
                    ...prev,
                    citasPorConfirmar: Math.max(0, prev.citasPorConfirmar - 1)
                }));
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
                    onAbrirExpediente={() => setCarnetAbierto(true)}
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
            />

            {/* Modal de Expediente / Carnet del Próximo Paciente */}
            {carnetAbierto && (
                <CarnetMascotaModal 
                    mascotaDto={mascotaExpediente}
                    onClose={() => setCarnetAbierto(false)}
                    esVeterinario={true}
                />
            )}
        </div>
    );
};

export default DashboardVeterinario;
