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
                    nombreMascota: p.NombreMascota || p.nombreMascota,
                    especie: p.Especie || p.especie,
                    raza: p.Raza || p.raza,
                    sexo: p.Sexo || p.sexo,
                    peso: p.Peso || p.peso,
                    alergias: p.Alergias || p.alergias || 'Ninguna',
                    historialVacunas: p.historialVacunas || [],
                    historialCitas: p.historialCitas || []
                }));

                // Si viene vacío del backend, cargar datos demo para pruebas
                if (pacientesMapeados.length === 0) {
                    pacientesMapeados = demoPacientes;
                }
                setPacientes(pacientesMapeados);
            } catch (err) {
                console.error("Error al cargar expedientes, usando datos de demostración:", err);
                setPacientes(demoPacientes);
            } finally {
                setCargando(false);
            }
        };

        const demoPacientes = [
            {
                idMascota: 'M001',
                nombreMascota: 'Luna',
                especie: 'Gato',
                raza: 'Siamés',
                peso: 4.2,
                fechaNacimiento: '2021-05-15',
                sexo: 'Hembra',
                alergias: 'Ninguna',
                historialVacunas: [
                    { id: 101, vacuna: 'Triple Felina', fecha: '2023-08-10', proxima: '2024-08-10', peso: '4.0 kg' }
                ],
                historialCitas: [
                    { id: 201, fecha: '2023-11-05 10:00', servicio: 'Consulta General', veterinario: 'Dr. Alejandro Fernández', descripcion: 'Chequeo general. Paciente sano.', estado: 'Completada' }
                ]
            },
            {
                idMascota: 'M002',
                nombreMascota: 'Max',
                especie: 'Perro',
                raza: 'Golden Retriever',
                peso: 28.5,
                fechaNacimiento: '2019-11-20',
                sexo: 'Macho',
                alergias: 'Pollo',
                historialVacunas: [
                    { id: 102, vacuna: 'Rabia', fecha: '2023-01-15', proxima: '2024-01-15', peso: '28.0 kg' },
                    { id: 103, vacuna: 'Séxtuple Canina', fecha: '2023-04-20', proxima: '2024-04-20', peso: '28.2 kg' }
                ],
                historialCitas: [
                    { id: 202, fecha: '2023-09-12 11:30', servicio: 'Consulta Dermatológica', veterinario: 'Dr. Alejandro Fernández', descripcion: 'Alergia en piel. Dieta especial.', estado: 'Completada' }
                ]
            },
            {
                idMascota: 'M003',
                nombreMascota: 'Firulais',
                especie: 'Perro',
                raza: 'Labrador',
                peso: 25.0,
                fechaNacimiento: '2022-03-10',
                sexo: 'Macho',
                alergias: 'Ninguna',
                historialVacunas: [
                    { id: 104, vacuna: 'Antirrábica', fecha: '2023-05-10', proxima: '2024-05-10', peso: '24.5 kg' }
                ],
                historialCitas: [
                    { id: 203, fecha: '2023-10-01 16:00', servicio: 'Consulta General', veterinario: 'Dr. Alejandro Fernández', descripcion: 'Revisión preventiva de salud.', estado: 'Completada' }
                ]
            }
        ];
        
        cargarPacientes();
    }, []);

    const handleVerCarnet = (mascota) => {
        setMascotaSeleccionada(mascota);
        setModalCarnetAbierto(true);
    };

    // Filtrar pacientes por búsqueda
    const pacientesFiltrados = pacientes.filter(p => 
        p.nombreMascota.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.especie.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.raza.toLowerCase().includes(busqueda.toLowerCase())
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
