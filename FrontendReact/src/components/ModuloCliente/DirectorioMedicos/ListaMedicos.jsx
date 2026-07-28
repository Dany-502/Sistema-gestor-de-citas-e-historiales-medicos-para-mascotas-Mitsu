import React, { useState, useEffect } from 'react';
import './ListaMedicosEstilos.css';
import TarjetaMedico from './TarjetaMedico';

const ListaMedicos = () => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5);

    // Datos simulados iniciales (para luego reemplazar con fetch de Backend)
    const [medicos, setMedicos] = useState([
        {
            idVeterinario: 1,
            nombre: 'Juan',
            apPaterno: 'Pérez',
            apMaterno: 'Gómez',
            especialidad: 'Cirugía Veterinaria',
            cedula: 'CED-9876543',
            telefono: '555-123-4567',
            correoElectronico: 'juan.perez@mitsu.com',
            horarios: [
                { idHorario: 1, diaSemana: 'Lunes a Viernes', horaInicio: '08:00', horaFin: '16:00' },
                { idHorario: 2, diaSemana: 'Sábado', horaInicio: '09:00', horaFin: '14:00' }
            ]
        },
        {
            idVeterinario: 2,
            nombre: 'María',
            apPaterno: 'López',
            apMaterno: 'Martínez',
            especialidad: 'Medicina General y Felinos',
            cedula: 'CED-1234567',
            telefono: '555-987-6543',
            correoElectronico: 'maria.lopez@mitsu.com',
            horarios: [
                { idHorario: 3, diaSemana: 'Lunes a Viernes', horaInicio: '10:00', horaFin: '18:00' }
            ]
        },
        {
            idVeterinario: 3,
            nombre: 'Carlos',
            apPaterno: 'Ruiz',
            apMaterno: 'Silva',
            especialidad: 'Odontología Veterinaria',
            cedula: 'CED-5556667',
            telefono: '555-456-7890',
            correoElectronico: 'carlos.ruiz@mitsu.com',
            horarios: [
                { idHorario: 4, diaSemana: 'Martes a Sábado', horaInicio: '09:00', horaFin: '17:00' }
            ]
        }
    ]);

    // Simulador de carga del backend
    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 1200); 
        return () => clearTimeout(timer);
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
                    <p className="subtituloMedicos">Conoce a nuestros especialistas y sus horarios de atención.</p>
                </div>
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
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ListaMedicos;
