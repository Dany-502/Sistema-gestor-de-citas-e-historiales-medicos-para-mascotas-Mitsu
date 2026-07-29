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
                                    {proximaCita.mascotaNombre} ({proximaCita.especie}, {proximaCita.raza}) - {proximaCita.fecha}, {proximaCita.hora}
                                </h4>
                                <p><strong>Servicio:</strong> {proximaCita.servicio}</p>
                                <div className="accionesCita">
                                    <button className="botonPrimario">Cancelar</button>
                                    <button className="botonPrimario">Ver detalles</button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="contenidoCita estadoVacio">
                            <p>No tienes ninguna cita programada próximamente.</p>
                            <button className="botonPrimario">Agendar una cita</button>
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
                        <p style={{ padding: '20px' }}>Cargando información...</p>
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
                                    className="tarjetaMascotaIndividual"
                                    onClick={() => navigate('/cliente/mascotas')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="infoPrincipalMascota">
                                        <div className="avatarMascotaTemporal avatarGrande" style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eef2f5' }}>
                                            {foto ? (
                                                <img src={foto} alt={nombre} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            ) : (
                                                <img src={iconPata} alt="Pata" style={{ width: '50%', height: '50%', opacity: 0.3 }} />
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
                                            <div className="puntoGris"></div>
                                            <span>-Sin citas pendientes</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="estadoVacio" style={{ width: '100%' }}>
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
                        <img src={iconWhatsapp} alt="WhatsApp" className="iconoContacto" style={{ width: '20px', height: '20px' }} />
                        ¡Contáctanos!
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ContenedorPrincipal;
