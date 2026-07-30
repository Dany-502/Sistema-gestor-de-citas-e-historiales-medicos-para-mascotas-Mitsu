import React, { useState, useEffect } from 'react';
import './ListaMedicosEstilos.css';
import TarjetaMedico from './TarjetaMedico';
import { veterinarioService } from '../../../services/api';
import FormularioMedicoAdminModal from './FormularioMedicoAdminModal';

const ListaMedicos = ({ esAdmin = false }) => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5);
    const [medicos, setMedicos] = useState([]);
    const [error, setError] = useState('');
    
    // Estados para el Modal del Administrador
    const [modalAbierto, setModalAbierto] = useState(false);
    const [medicoAEditar, setMedicoAEditar] = useState(null);

    useEffect(() => {
        const cargarMedicos = async () => {
            try {
                setCargando(true);
                const datos = await veterinarioService.obtenerVeterinarios();
                setMedicos(datos);
            } catch (err) {
                console.error("Error al cargar veterinarios, usando mocks:", err);
                // Mock data para ver el diseño
                setMedicos([
                    { idVeterinario: 1, nombre: 'Miguel', apPaterno: 'Alonso', especialidad: 'Cirujano', telefono: '555-1234', correo: 'miguel@veterinaria.com', horarioApertura: '09:00', horarioCierre: '18:00', fotoUrl: null },
                    { idVeterinario: 2, nombre: 'Ana', apPaterno: 'Gomez', especialidad: 'Medicina General', telefono: '555-5678', correo: 'ana@veterinaria.com', horarioApertura: '10:00', horarioCierre: '20:00', fotoUrl: null }
                ]);
            } finally {
                setCargando(false);
            }
        };

        cargarMedicos();
    }, []);

    const medicosFiltrados = medicos.filter(medico => {
        const nombreCompleto = `${medico.nombre} ${medico.apPaterno} ${medico.apMaterno}`.toLowerCase();
        return nombreCompleto.includes(busqueda.toLowerCase()) ||
               medico.especialidad.toLowerCase().includes(busqueda.toLowerCase());
    });

    const indiceUltimoMedico = paginaActual * tamanoPagina;
    const indicePrimerMedico = indiceUltimoMedico - tamanoPagina;
    const medicosPaginados = medicosFiltrados.slice(indicePrimerMedico, indiceUltimoMedico);
    const totalPaginas = Math.ceil(medicosFiltrados.length / tamanoPagina);

    return (
        <div className="contenedorListaMedicos">
            <div className="cabeceraMedicos">
                <div className="textosCabecera">
                    <h2 className="tituloMedicos">Directorio de Médicos</h2>
                    <p className="subtituloMedicos">
                        {esAdmin ? 'Gestión de veterinarios y personal médico.' : 'Conoce a nuestros especialistas y sus horarios de atención.'}
                    </p>
                </div>
                {esAdmin && (
                    <button 
                        className="btn-agregar-medico"
                        onClick={() => {
                            setMedicoAEditar(null);
                            setModalAbierto(true);
                        }}
                    >
                        + Agregar Médico
                    </button>
                )}
            </div>

            <div className="barraFiltros">
                <div className="contenedorBuscador">
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o especialidad..." 
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            setPaginaActual(1);
                        }}
                        className="inputBuscadorMedicos"
                    />
                </div>
                
                <div className="contenedorPaginacionSuperior">
                    <div className="opcionesTamanoPagina">
                        <label>Mostrar:</label>
                        <select 
                            value={tamanoPagina} 
                            onChange={(e) => {
                                setTamanoPagina(Number(e.target.value));
                                setPaginaActual(1);
                            }}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>

                    <div className="controlesPaginacion">
                        <button 
                            className="botonPaginacion" 
                            onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
                            disabled={paginaActual === 1}
                        >
                            Anterior
                        </button>
                        <span className="infoPaginacion">
                            Página {paginaActual} de {totalPaginas || 1}
                        </span>
                        <button 
                            className="botonPaginacion" 
                            onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
                            disabled={paginaActual === totalPaginas || totalPaginas === 0}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {cargando ? (
                <div className="estadoCargandoMedicos">
                    <div className="spinnerMedicos"></div>
                    <p>Obteniendo directorio de médicos...</p>
                </div>
            ) : medicosFiltrados.length === 0 ? (
                <div className="estadoVacioMedicos">
                    <p>No se encontraron médicos con esos criterios de búsqueda.</p>
                </div>
            ) : (
                <div className="gridMedicos">
                    {medicosPaginados.map((medico) => (
                        <TarjetaMedico 
                            key={medico.idVeterinario} 
                            medico={medico} 
                            esAdmin={esAdmin}
                            onEditar={() => {
                                setMedicoAEditar(medico);
                                setModalAbierto(true);
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Modal para Registrar/Editar Médico (Solo Admin) */}
            {modalAbierto && esAdmin && (
                <FormularioMedicoAdminModal 
                    medicoAEditar={medicoAEditar}
                    onClose={() => setModalAbierto(false)}
                    onGuardar={(datosMedico) => {
                        console.log('Médico guardado:', datosMedico);
                        // Aquí en el futuro se enviará la petición POST/PUT al backend
                        setModalAbierto(false);
                    }}
                />
            )}
        </div>
    );
};

export default ListaMedicos;
