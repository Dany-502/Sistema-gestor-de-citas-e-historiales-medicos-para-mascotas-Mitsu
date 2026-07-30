import React, { useState, useEffect } from 'react';
import './ListaClientesEstilos.css';
import TarjetaCliente from './TarjetaCliente';
import DetalleClienteModal from './DetalleClienteModal';
import { clienteService } from '../../../services/api';

const ListaClientes = () => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5);
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState('');
    
    const [modalAbierto, setModalAbierto] = useState(false);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);

    useEffect(() => {
        const cargarClientes = async () => {
            try {
                setCargando(true);
                const data = await clienteService.obtenerTodos();
                let resultado = data || [];
                if (resultado.length === 0) {
                    resultado = demoClientes;
                }
                setClientes(resultado);
                setCargando(false);
            } catch (err) {
                console.error("Error al cargar clientes, usando datos demo:", err);
                setClientes(demoClientes);
                setCargando(false);
            }
        };

        const demoClientes = [
            {
                idCliente: 1,
                nombre: 'Juan',
                apPaterno: 'Pérez',
                apMaterno: 'García',
                correoElectronico: 'juan.perez@email.com',
                telefono: '555-1234',
                direccion: 'Calle Falsa 123, Colonia Centro',
                cantidadMascotas: 2,
                mascotas: [
                    { idMascota: 'M001', nombre: 'Firulais', especie: 'Perro', raza: 'Labrador' },
                    { idMascota: 'M002', nombre: 'Michi', especie: 'Gato', raza: 'Siamés' }
                ]
            },
            {
                idCliente: 2,
                nombre: 'María',
                apPaterno: 'López',
                apMaterno: 'Martínez',
                correoElectronico: 'maria.lopez@email.com',
                telefono: '555-5678',
                direccion: 'Av. Siempre Viva 742',
                cantidadMascotas: 1,
                mascotas: [
                    { idMascota: 'M003', nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever' }
                ]
            },
            {
                idCliente: 3,
                nombre: 'Carlos',
                apPaterno: 'Ruiz',
                apMaterno: 'Sánchez',
                correoElectronico: 'carlos.ruiz@email.com',
                telefono: '555-9012',
                direccion: 'Boulevard de los Sueños Rotos',
                cantidadMascotas: 1,
                mascotas: [
                    { idMascota: 'M004', nombre: 'Luna', especie: 'Gato', raza: 'Persa' }
                ]
            }
        ];

        cargarClientes();
    }, []);

    const abrirModal = (cliente) => {
        setClienteSeleccionado(cliente);
        setModalAbierto(true);
    };

    const cerrarModal = () => {
        setModalAbierto(false);
        setClienteSeleccionado(null);
    };

    const clientesFiltrados = clientes.filter(cliente => {
        const nombreCompleto = `${cliente.nombre} ${cliente.apPaterno} ${cliente.apMaterno}`.toLowerCase();
        return nombreCompleto.includes(busqueda.toLowerCase()) ||
               cliente.correoElectronico.toLowerCase().includes(busqueda.toLowerCase());
    });

    const indiceUltimoCliente = paginaActual * tamanoPagina;
    const indicePrimerCliente = indiceUltimoCliente - tamanoPagina;
    const clientesPaginados = clientesFiltrados.slice(indicePrimerCliente, indiceUltimoCliente);
    const totalPaginas = Math.ceil(clientesFiltrados.length / tamanoPagina);

    return (
        <div className="contenedorListaClientes">
            <div className="cabeceraClientes">
                <div className="textosCabecera">
                    <h2 className="tituloClientes">Directorio de Clientes</h2>
                    <p className="subtituloClientes">Gestiona la información de los dueños de mascotas y su contacto.</p>
                </div>
            </div>

            <div className="barraFiltros">
                <div className="contenedorBuscador">
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o correo..." 
                        value={busqueda}
                        onChange={(e) => {
                            setBusqueda(e.target.value);
                            setPaginaActual(1);
                        }}
                        className="inputBuscadorClientes"
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
                <div className="estadoCargandoClientes">
                    <div className="spinnerClientes"></div>
                    <p>Obteniendo directorio de clientes...</p>
                </div>
            ) : clientesFiltrados.length === 0 ? (
                <div className="estadoVacioClientes">
                    <p>No se encontraron clientes con esos criterios de búsqueda.</p>
                </div>
            ) : (
                <div className="gridClientes">
                    {clientesPaginados.map((cliente) => (
                        <TarjetaCliente 
                            key={cliente.idCliente} 
                            cliente={cliente} 
                            onVerDetalles={abrirModal}
                        />
                    ))}
                </div>
            )}

            <DetalleClienteModal 
                isOpen={modalAbierto} 
                onClose={cerrarModal} 
                cliente={clienteSeleccionado} 
            />
        </div>
    );
};

export default ListaClientes;
