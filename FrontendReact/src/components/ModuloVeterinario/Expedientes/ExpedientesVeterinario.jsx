import React, { useState, useEffect } from 'react';
import '../../ModuloCliente/MisMascotas/ListaMascotasEstilos.css';
import TarjetaMascota from '../../ModuloCliente/MisMascotas/TarjetaMascota';
import CarnetMascotaModal from '../../ModuloCliente/MisMascotas/CarnetMascotaModal';

const ExpedientesVeterinario = () => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [pacientes, setPacientes] = useState([]);
    
    // Paginación
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5);

    // Estados para el Carnet
    const [modalCarnetAbierto, setModalCarnetAbierto] = useState(false);
    const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);

    // SIMULACIÓN: Cargar pacientes asignados al veterinario
    useEffect(() => {
        const cargarPacientes = () => {
            setCargando(true);
            setTimeout(() => {
                // En el futuro: await axios.get('TU_URL_DEL_BACKEND/api/veterinario/pacientes');
                setPacientes([
                    {
                        idMascota: 1,
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
                            { id: 201, fecha: '2023-11-05 10:00', servicio: 'Consulta General', veterinario: 'Dr. Miguel Alonso', descripcion: 'Chequeo general. Diagnóstico: Paciente sano, peso estable.', estado: 'Completada' }
                        ]
                    },
                    {
                        idMascota: 2,
                        nombreMascota: 'Toby',
                        especie: 'Perro',
                        raza: 'Golden Retriever',
                        peso: 28.5,
                        fechaNacimiento: '2019-11-20',
                        sexo: 'Macho',
                        alergias: 'Pollo',
                        historialVacunas: [
                            { id: 102, vacuna: 'Rabia', fecha: '2021-01-15', proxima: '2022-01-15', peso: '25.0 kg' },
                            { id: 103, vacuna: 'Parvovirus', fecha: '2021-04-20', proxima: '2022-04-20', peso: '25.2 kg' },
                            { id: 104, vacuna: 'Moquillo', fecha: '2021-06-10', proxima: '2022-06-10', peso: '26.1 kg' },
                            { id: 105, vacuna: 'Rabia (Refuerzo)', fecha: '2022-01-20', proxima: '2023-01-20', peso: '27.5 kg' },
                            { id: 106, vacuna: 'Parvovirus (Refuerzo)', fecha: '2022-04-25', proxima: '2023-04-25', peso: '27.8 kg' },
                            { id: 107, vacuna: 'Leptospirosis', fecha: '2022-08-05', proxima: '2023-08-05', peso: '28.0 kg' },
                            { id: 108, vacuna: 'Rabia (Refuerzo)', fecha: '2023-01-15', proxima: '2024-01-15', peso: '28.0 kg' },
                            { id: 109, vacuna: 'Bordetella', fecha: '2023-03-10', proxima: '2024-03-10', peso: '28.3 kg' },
                            { id: 110, vacuna: 'Parvovirus (Refuerzo)', fecha: '2023-04-20', proxima: '2024-04-20', peso: '28.2 kg' },
                            { id: 111, vacuna: 'Desparasitación', fecha: '2023-06-01', proxima: '2023-12-01', peso: '28.5 kg' }
                        ],
                        historialCitas: [
                            { id: 202, fecha: '2021-09-12 11:30', servicio: 'Consulta Dermatológica', veterinario: 'Dra. Ana López', descripcion: 'Alergia cutánea. Diagnóstico: Reacción alérgica alimenticia. Se receta antihistamínico y cambio de dieta.', estado: 'Completada' },
                            { id: 203, fecha: '2021-12-01 16:00', servicio: 'Consulta General', veterinario: 'Dr. Miguel Alonso', descripcion: 'Vómitos esporádicos. Diagnóstico: Infección gastrointestinal leve.', estado: 'Completada' },
                            { id: 204, fecha: '2022-03-15 09:00', servicio: 'Corte y Baño', veterinario: 'Estética', descripcion: 'Servicio de estética canina completo.', estado: 'Completada' },
                            { id: 205, fecha: '2022-07-22 14:00', servicio: 'Consulta General', veterinario: 'Dr. Miguel Alonso', descripcion: 'Revisión anual. Diagnóstico: Saludable.', estado: 'Completada' },
                            { id: 206, fecha: '2022-11-10 10:30', servicio: 'Vacunación', veterinario: 'Dr. Miguel Alonso', descripcion: 'Aplicación de vacunas anuales.', estado: 'Completada' },
                            { id: 207, fecha: '2023-02-05 15:00', servicio: 'Consulta Ortopédica', veterinario: 'Dr. Carlos Ruiz', descripcion: 'Cojera pata trasera. Diagnóstico: Esguince leve.', estado: 'Completada' },
                            { id: 208, fecha: '2023-05-18 11:00', servicio: 'Revisión', veterinario: 'Dr. Carlos Ruiz', descripcion: 'Seguimiento de esguince. Diagnóstico: Recuperación completa.', estado: 'Completada' },
                            { id: 209, fecha: '2023-09-12 11:30', servicio: 'Consulta Dermatológica', veterinario: 'Dra. Ana López', descripcion: 'Revisión de alergia cutánea. Diagnóstico: Controlado bajo dieta.', estado: 'Completada' }
                        ]
                    },
                    {
                        idMascota: 3,
                        nombreMascota: 'Rocky',
                        especie: 'Perro',
                        raza: 'Mestizo',
                        peso: 15.0,
                        fechaNacimiento: '2022-02-10',
                        sexo: 'Macho',
                        alergias: 'Ninguna',
                        historialVacunas: [],
                        historialCitas: []
                    }
                ]);
                setCargando(false);
            }, 1000);
        };
        
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
                    <p className="subtituloMascotas">Consulta el historial clínico de tus pacientes asignados.</p>
                </div>
                {/* No agregamos botón "Nueva Mascota" porque el veterinario solo lee expedientes */}
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
                    onClose={() => setModalCarnetAbierto(false)}
                    mascotaDto={mascotaSeleccionada}
                    esVeterinario={true}
                />
            )}
        </div>
    );
};

export default ExpedientesVeterinario;
