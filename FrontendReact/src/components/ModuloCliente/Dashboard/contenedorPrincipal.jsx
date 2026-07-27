import React, { useState, useEffect } from 'react';
import './DashboardEstilos.css';
import './MascotasEstilos.css';
import './ClinicaEstilos.css';
import iconWhatsapp from '../../../assets/iconos/whatsapp.png';

const ContenedorPrincipal = () => {
    const [usuario, setUsuario] = useState({ nombre: "Miguel Alonso" });

    const [proximaCita, setProximaCita] = useState(null);
    const [cargandoCita, setCargandoCita] = useState(true);

    const [mascotasCliente, setMascotasCliente] = useState([]);
    const [cargandoMascotas, setCargandoMascotas] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setProximaCita({
                mascotaNombre: "Max",
                especie: "Perro",
                raza: "Maltes",
                fecha: "15 de Febrero",
                hora: "10:00 AM",
                servicio: "Vacunación (Rabia)"
            });
            setCargandoCita(false);

            // Simulando carga de mascotas desde la API / Base de datos
            setMascotasCliente([
                { id: '#SM1200', nombre: 'Simitrio', raza: 'Maltes', edad: '5 años', citasPendientes: false },
                { id: '#QT2058', nombre: 'Coquito', raza: 'Snauser', edad: '3 años', citasPendientes: false },
                { id: '#FRL2003', nombre: 'Firulais', raza: 'Labrador', edad: '2 años', citasPendientes: false },
                { id: '#LUN456', nombre: 'Luna', raza: 'Pug', edad: '1 año', citasPendientes: false },
                { id: '#RCO789', nombre: 'Rocco', raza: 'Bulldog', edad: '4 años', citasPendientes: true },
                { id: '#MAX123', nombre: 'Max', raza: 'Golden Retriever', edad: '2 años', citasPendientes: false }
            ]);
            setCargandoMascotas(false);
        }, 1000);
    }, []);

    return (
        <div className="panelCliente">
            <h1 className="tituloPanel">!Bienvenido de nuevo, {usuario.nombre}!</h1>

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
                    <h3 className="tituloTarjeta">Acciones rapidas</h3>
                    <div className="listaAcciones">
                        <button className="botonPrimario botonAnchoCompleto">+ Agendar cita</button>
                        <button className="botonPrimario botonAnchoCompleto">+ Registrar Mascota</button>
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
                        mascotasCliente.map((mascota, indice) => (
                            <div key={indice} className="tarjetaMascotaIndividual">
                                <div className="infoPrincipalMascota">
                                    <div className="avatarMascotaTemporal avatarGrande"></div>
                                    <div className="datosMascota">
                                        <h4>{mascota.nombre}</h4>
                                        <span className="datoSecundario">{mascota.id}</span>
                                        <span className="datoSecundario">{mascota.raza}</span>
                                        <span className="datoSecundario">{mascota.edad}</span>
                                    </div>
                                </div>
                                <div className="estadoMascota">
                                    <div className="filaEstado">
                                        <div className="puntoGris"></div>
                                        <span>{mascota.citasPendientes ? '-Citas pendientes' : '-Sin citas pendientes'}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="estadoVacio" style={{ width: '100%' }}>
                            <p>Aún no tienes mascotas registradas.</p>
                            <button className="botonPrimario">+ Registrar Mascota</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Tarjeta Contenedor: Información de la Clínica */}
            <div className="tarjeta">
                <h3 className="tituloTarjeta">Información de la clinica</h3>
                <div className="contenedorClinica">
                    <div className="detallesClinica">
                        <div className="filaInfoClinica">
                            {/* Icono vectorial SVG de ubicación (Pin) */}
                            <svg className="iconoInfo" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                <circle cx="12" cy="10" r="3"></circle>
                            </svg>
                            <span>Av. Independencia, #313, Col. Dolores, Oaxaca de Juarez</span>
                        </div>
                        <div className="filaInfoClinica">
                            {/* Icono vectorial SVG de reloj */}
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
