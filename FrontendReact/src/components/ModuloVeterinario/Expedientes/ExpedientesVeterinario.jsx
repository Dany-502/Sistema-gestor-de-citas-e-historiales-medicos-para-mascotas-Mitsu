import React, { useState, useEffect } from 'react';
import '../../ModuloCliente/MisMascotas/ListaMascotasEstilos.css';
import './ExpedientesVeterinario.css';
import TarjetaMascota from '../../ModuloCliente/MisMascotas/TarjetaMascota';
import CarnetMascotaModal from '../../ModuloCliente/MisMascotas/CarnetMascotaModal';
import FormularioMascotaAdminModal from './FormularioMascotaAdminModal';
import { mascotaService } from '../../../services/api';

const ExpedientesVeterinario = ({ esAdmin = false }) => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [pacientes, setPacientes] = useState([]);
    
    // Paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5);

    // Estados para el Carnet
    const [modalCarnetAbierto, setModalCarnetAbierto] = useState(false);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
    const [modalNuevaMascotaAbierto, setModalNuevaMascotaAbierto] = useState(false);

    useEffect(() => {
        const cargarPacientes = async () => {
            setCargando(true);
            try {
                const data = await mascotaService.obtenerTodas();
                let pacientesMapeados = (data || []).map(p => ({
                    ...p,
                    idMascota: p.id_Mascota || p.idMascota,
                    nombreMascota: p.NombreMascota || p.nombreMascota,
                    especie: p.Especie || p.especie,
                    raza: p.Raza || p.raza,
                    sexo: p.Sexo || p.sexo,
                    peso: p.Peso || p.peso,
                    fechaNacimiento: p.FechaNacimiento || p.fechaNacimiento,
                    color: p.Color || p.color,
                    adultoResponsable: p.adultoResponsable,
                    alergias: p.Alergias || p.alergias || 'Ninguna',
                    historialVacunas: p.historialVacunas || [],
                    historialCitas: p.historialCitas || []
                }));

                setPacientes(pacientesMapeados);
            } catch (err) {
                console.error("Error al cargar expedientes:", err);
                setPacientes([]);
            } finally {
                setCargando(false);
            }
        };


        cargarPacientes();
    }, []);

    const handleVerCarnet = (mascota) => {
        setMascotaSeleccionada(mascota);
        setModalCarnetAbierto(true);
    };

    useEffect(() => {
        setPaginaActual(1);
    }, [busqueda]);

    // Filtrar pacientes por búsqueda
    const pacientesFiltrados = pacientes.filter(p => 
        (p.nombreMascota || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (p.especie || '').toLowerCase().includes(busqueda.toLowerCase()) ||
        (p.raza || '').toLowerCase().includes(busqueda.toLowerCase())
    );

    // Lógica de paginación
    const totalPaginas = Math.ceil(pacientesFiltrados.length / tamanoPagina);
    const indiceUltimo = paginaActual * tamanoPagina;
    const indicePrimero = indiceUltimo - tamanoPagina;
    const pacientesPaginados = pacientesFiltrados.slice(indicePrimero, indiceUltimo);

    const irPaginaAnterior = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1);
    };

    const irPaginaSiguiente = () => {
        if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
    };

    return (
        <div className="contenedorListaMascotas">
            <div className="cabeceraMascotas">
                <div className="textosCabecera">
                    <h2 className="tituloMascotas">Expedientes Médicos</h2>
                    <p className="subtituloMascotas">Consulta el historial clínico de {esAdmin ? 'todos los pacientes de la clínica' : 'tus pacientes asignados'}.</p>
                </div>
                {esAdmin && (
                    <button 
                        className="btnNuevaMascota btn-nueva-mascota-admin" 
                        onClick={() => setModalNuevaMascotaAbierto(true)}
                    >
                        Nueva Mascota
                    </button>
                )}
            </div>

            <div className="barraFiltros">
                <div className="contenedorBuscador">
                    <input 
                        type="text" 
                        className="inputBuscadorMascotas" 
                        placeholder="Buscar por nombre, especie o raza..." 
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>

                <div className="contenedorPaginacionSuperior">
                    <div className="opcionesTamanoPagina">
                        <span>Mostrar:</span>
                        <select 
                            value={tamanoPagina} 
                            onChange={(e) => {
                                setTamanoPagina(Number(e.target.value));
                                setPaginaActual(1);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                        </select>
                    </div>
                    
                    <div className="controlesPaginacion">
                        <button 
                            className="botonPaginacion" 
                            onClick={irPaginaAnterior} 
                            disabled={paginaActual === 1}
                        >
                            Anterior
                        </button>
                        <span className="infoPaginacion">
                            Pág {paginaActual} / {totalPaginas === 0 ? 1 : totalPaginas}
                        </span>
                        <button 
                            className="botonPaginacion" 
                            onClick={irPaginaSiguiente} 
                            disabled={paginaActual >= totalPaginas || totalPaginas === 0}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {cargando ? (
                <div className="estadoCargandoMascotas">
                    <div className="spinnerMascotas"></div>
                    <p>Cargando expedientes...</p>
                </div>
            ) : pacientesFiltrados.length > 0 ? (
                <div className="gridMascotas">
                    {pacientesPaginados.map((paciente) => (
                        <TarjetaMascota 
                            key={paciente.idMascota} 
                            mascota={paciente} 
                            onVerCarnet={handleVerCarnet}
                        />
                    ))}
                </div>
            ) : (
                <div className="estadoVacioMascotas">
                    <p>No tienes pacientes asignados que coincidan con la búsqueda.</p>
                </div>
            )}

            {/* Modal Reutilizado */}
            {modalCarnetAbierto && (
                <CarnetMascotaModal 
                    isOpen={modalCarnetAbierto} 
                    onClose={() => setModalCarnetAbierto(false)} 
                    mascotaDto={mascotaSeleccionada}
                    esVeterinario={!esAdmin}
                    esAdmin={esAdmin}
                />
            )}

            {/* Modal para Crear Nueva Mascota (Admin) */}
            <FormularioMascotaAdminModal
                isOpen={modalNuevaMascotaAbierto}
                onClose={() => setModalNuevaMascotaAbierto(false)}
                onSave={(datosMascota) => {
                    console.log('Mascota guardada:', datosMascota);
                }}
            />
        </div>
    );
};

export default ExpedientesVeterinario;
