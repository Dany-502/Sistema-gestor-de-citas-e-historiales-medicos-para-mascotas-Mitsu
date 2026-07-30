import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DashboardEstilos.css';
import './MascotasEstilos.css';
import './ClinicaEstilos.css';
import iconWhatsapp from '../../../assets/iconos/whatsapp.png';
import iconPata from '../../../assets/iconos/pata.png';
import { clienteService, mascotaService } from '../../../services/api';

const ContenedorPrincipal = () => {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState({ nombre: "Cliente Mitsu" });

    const [proximaCita, setProximaCita] = useState(null);
    const [cargandoCita, setCargandoCita] = useState(true);

    const [mascotasCliente, setMascotasCliente] = useState([]);
    const [cargandoMascotas, setCargandoMascotas] = useState(true);

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return 'Desconocida';
        const fecha = new Date(fechaNacimiento);
        const hoy = new Date();

        let años = hoy.getFullYear() - fecha.getFullYear();
        let meses = hoy.getMonth() - fecha.getMonth();

        if (meses < 0 || (meses === 0 && hoy.getDate() < fecha.getDate())) {
            años--;
            meses += 12;
        }

        if (años > 0) {
            return `${años} año${años > 1 ? 's' : ''}`;
        } else if (meses > 0) {
            return `${meses} mes${meses > 1 ? 'es' : ''}`;
        } else {
            return 'Menos de 1 mes';
        }
    };

    useEffect(() => {
        let cancelado = false;

        async function cargarDatosDashboard() {
            try {
                // 1. Cargar perfil del cliente
                const perfil = await clienteService.obtenerPerfil();
                if (!cancelado && perfil) {
                    setUsuario({
                        nombre: perfil.nombreCompleto || perfil.nombre
                    });
                }

                // 2. Cargar las mascotas
                const mascotas = await mascotaService.obtenerMascotas();
                if (!cancelado) {
                    setMascotasCliente(mascotas || []);
                }

                // 3. Cargar las citas
                const { citaService } = await import('../../../services/api');
                const citas = await citaService.obtenerMisCitas();
                if (!cancelado) {
                    const citasPendientes = citas.filter(c => c.estado === 'Pendiente' || c.estado === 'Confirmada');
                    // Find closest future appointment (assuming list is sorted descending or we just sort them)
                    const ahora = new Date();
                    const citasFuturas = citasPendientes.filter(c => new Date(c.fechaHoraInicio) >= ahora)
                        .sort((a, b) => new Date(a.fechaHoraInicio) - new Date(b.fechaHoraInicio));

                    if (citasFuturas.length > 0) {
                        const prox = citasFuturas[0];
                        const fechaObj = new Date(prox.fechaHoraInicio);
                        setProximaCita({
                            idCita: prox.idCita,
                            mascotaNombre: prox.nombreMascota,
                            especie: prox.especieMascota || 'Mascota',
                            raza: prox.razaMascota || '',
                            fecha: fechaObj.toLocaleDateString(),
                            hora: fechaObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            servicio: prox.nombreServicio,
                            estado: prox.estado
                        });
                    }

                    // Assign pending appointments to each pet to display on cards
                    if (mascotas && mascotas.length > 0) {
                        const mascotasConCitas = mascotas.map(m => {
                            const numPendientes = citasPendientes.filter(c => c.idMascota === (m.id_Mascota || m.idMascota)).length;
                            return { ...m, numCitasPendientes: numPendientes };
                        });
                        setMascotasCliente(mascotasConCitas);
                    }
                }
            } catch (error) {
                console.error("Error al cargar información del dashboard:", error);
            } finally {
                if (!cancelado) {
                    setCargandoMascotas(false);
                    setCargandoCita(false);
                }
            }
        }

        cargarDatosDashboard();

        return () => {
            cancelado = true;
        };
    }, []);

    return (
        <div className="panelCliente">

            <div className="filaSuperiorTarjetas">
                {/* Tarjeta: Próxima Cita */}
                <div className="tarjeta tarjetaProximaCita">
                    <h3 className="tituloTarjeta">Próxima cita</h3>

                    {cargandoCita ? (
                        <p>Cargando información...</p>
                    ) : proximaCita ? (
                        <div className="contenidoCita">
                            <div className="avatarMascotaTemporal"></div>
                            <div className="infoCita">
                                <h4>
                                    {proximaCita.mascotaNombre} ({proximaCita.especie}{proximaCita.raza ? `, ${proximaCita.raza}` : ''}) - {proximaCita.fecha}, {proximaCita.hora}
                                </h4>
                                <p><strong>Servicio:</strong> {proximaCita.servicio} <span style={{marginLeft: '10px', color: proximaCita.estado === 'Confirmada' ? 'green' : 'orange'}}>({proximaCita.estado})</span></p>
                                <div className="accionesCita">
                                    <button className="botonPrimario" onClick={() => navigate('/cliente/mis-citas')}>Ver Detalles</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="contenidoCita estadoVacio">
                            <p>No tienes ninguna cita programada próximamente.</p>
                            <button className="botonPrimario" onClick={() => navigate('/cliente/mis-citas')}>Agendar una cita</button>
                        </div>
                    )}
                </div>

                {/* Tarjeta: Acciones Rápidas */}
                <div className="tarjeta tarjetaAccionesRapidas">
                    <h3 className="tituloTarjeta">Acciones rápidas</h3>
                    <div className="listaAcciones">
                        <button className="botonPrimario botonAnchoCompleto">+ Agendar cita</button>
                        <button
                            className="botonPrimario botonAnchoCompleto"
                            onClick={() => navigate('/cliente/mascotas')}
                        >
                            + Registrar Mascota
                        </button>
                    </div>
                </div>
            </div>

            {/* Tarjeta Contenedor: Tus Mascotas */}
            <div className="tarjeta contenedorMascotas">
                <h3 className="tituloTarjeta">Tus Mascotas ({mascotasCliente.length})</h3>

                <div className="listaMascotas">
                    {cargandoMascotas ? (
                        <p className="p-20">Cargando información...</p>
                    ) : mascotasCliente.length > 0 ? (
                        mascotasCliente.map((mascota, indice) => {
                            const nombre = mascota.NombreMascota || mascota.nombreMascota || 'Sin nombre';
                            const id = mascota.id_Mascota || mascota.idMascota || '';
                            const raza = mascota.Raza || mascota.raza || '';
                            const especie = mascota.Especie || mascota.especie || '';
                            const fechaNac = mascota.FechaNacimiento || mascota.fechaNacimiento;
                            const foto = mascota.fotoUrl || mascota.imagen;
                            const edad = calcularEdad(fechaNac);

                            return (
                                <div
                                    key={id || indice}
                                    className="tarjetaMascotaIndividual cursor-pointer"
                                    onClick={() => navigate('/cliente/mascotas')}
                                >
                                    <div className="infoPrincipalMascota">
                                        <div className="avatarMascotaTemporal avatarGrande avatar-mascota-img-container">
                                            {foto ? (
                                                <img src={foto} alt={nombre} className="avatar-mascota-img" />
                                            ) : (
                                                <img src={iconPata} alt="Pata" className="avatar-mascota-placeholder" />
                                            )}
                                        </div>
                                        <div className="datosMascota">
                                            <h4>{nombre}</h4>
                                            <span className="datoSecundario">{id}</span>
                                            <span className="datoSecundario">{especie} - {raza}</span>
                                            <span className="datoSecundario">{edad}</span>
                                        </div>
                                    </div>
                                    <div className="estadoMascota">
                                        <div className="filaEstado">
                                            <div className={mascota.numCitasPendientes > 0 ? "puntoVerde" : "puntoGris"} style={mascota.numCitasPendientes > 0 ? {backgroundColor: 'green', width: '10px', height: '10px', borderRadius: '50%', display: 'inline-block', marginRight: '5px'} : {}}></div>
                                            <span style={mascota.numCitasPendientes > 0 ? {color: 'green', fontWeight: 'bold'} : {}}>
                                                {mascota.numCitasPendientes > 0 ? `${mascota.numCitasPendientes} cita(s) pendiente(s)` : '-Sin citas pendientes'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="estadoVacio w-100">
                            <p>Aún no tienes mascotas registradas en tu cuenta.</p>
                            <button
                                className="botonPrimario"
                                onClick={() => navigate('/cliente/mascotas')}
                            >
                                + Registrar Mascota
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tarjeta Contenedor: Información de la Clínica */}
            <div className="tarjeta">
                <h3 className="tituloTarjeta">Información de la clínica</h3>
                <div className="contenedorClinica">
                    <div className="detallesClinica">
                        <div className="filaInfoClinica">
                            <svg className="iconoInfo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Av. Independencia, #313, Col. Dolores, Oaxaca de Juarez</span>
                        </div>
                        <div className="filaInfoClinica">
                            <svg className="iconoInfo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                            <span><strong>Abierto:</strong> 8:00 - 17:00</span>
                        </div>
                    </div>
                    <button className="botonContacto">
                        <img src={iconWhatsapp} alt="WhatsApp" className="iconoContacto icono-whatsapp" />
                        ¡Contáctanos!
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ContenedorPrincipal;
