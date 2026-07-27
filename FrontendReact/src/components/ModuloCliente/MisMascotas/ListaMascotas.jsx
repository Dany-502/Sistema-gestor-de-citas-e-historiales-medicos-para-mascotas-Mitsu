import React, { useState, useEffect } from 'react';
import './ListaMascotasEstilos.css';
import TarjetaMascota from './TarjetaMascota';
import FormularioMascotaModal from './FormularioMascotaModal';
import CarnetMascotaModal from './CarnetMascotaModal';
import Swal from 'sweetalert2';

const ListaMascotas = () => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5); // Por defecto 5 para pruebas
    const [modalAbierto, setModalAbierto] = useState(false);
    const [mascotaCarnetSeleccionada, setMascotaCarnetSeleccionada] = useState(null);
    const [mascotaAEditar, setMascotaAEditar] = useState(null);

    // Mock temporal del usuario que inició sesión (luego vendrá del Auth Context o backend)
    const [usuarioSesion] = useState({
        nombre: "Miguel Alberto",
        telefono: "+52 55 1234 5678"
    });

    // Simulando base de datos con los atributos del esquema
    const [mascotas, setMascotas] = useState([
        { id_Mascota: '#SM1200', NombreMascota: 'Simitrio', Especie: 'Perro', Raza: 'Maltes', Peso: 4.0, FechaNacimiento: '2025-01-01', Sexo: 'Macho', Alergias: 'No' },
        { id_Mascota: '#QT2058', NombreMascota: 'Coquito', Especie: 'Perro', Raza: 'Snauser', Peso: 5.5, FechaNacimiento: '2023-05-10', Sexo: 'Macho', Alergias: 'Pollo' },
        { id_Mascota: '#FRL2003', NombreMascota: 'Firulais', Especie: 'Perro', Raza: 'Labrador', Peso: 25.0, FechaNacimiento: '2024-02-15', Sexo: 'Macho', Alergias: 'Ninguna' },
        { id_Mascota: '#LN1029', NombreMascota: 'Luna', Especie: 'Gato', Raza: 'Siames', Peso: 3.2, FechaNacimiento: '2024-11-20', Sexo: 'Hembra', Alergias: 'Ninguna' },
        { id_Mascota: '#RC9081', NombreMascota: 'Rocco', Especie: 'Perro', Raza: 'Bulldog', Peso: 18.0, FechaNacimiento: '2022-08-05', Sexo: 'Macho', Alergias: 'No' },
        { id_Mascota: '#MX4052', NombreMascota: 'Max', Especie: 'Perro', Raza: 'Golden Retriever', Peso: 30.0, FechaNacimiento: '2021-04-12', Sexo: 'Macho', Alergias: 'No' }
    ]);

    // Simulador de carga del backend
    useEffect(() => {
        const timer = setTimeout(() => {
            setCargando(false);
        }, 1200); // 1.2 segundos de simulación
        return () => clearTimeout(timer);
    }, []);

    const handleEliminarMascota = (mascota) => {
        Swal.fire({
            title: `¿Estás seguro de eliminar a ${mascota.NombreMascota}?`,
            text: "Esta acción no se puede revertir y borrará todo su historial.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#a0aec0',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                // En una app real, esto haría una llamada DELETE a la API.
                setMascotas(mascotas.filter(m => m.id_Mascota !== mascota.id_Mascota));
                
                Swal.fire({
                    title: '¡Eliminada!',
                    text: 'La mascota ha sido eliminada correctamente.',
                    icon: 'success',
                    confirmButtonColor: '#00bcd4'
                });
            }
        });
    };

    const handleEditarMascota = (mascota) => {
        setMascotaAEditar(mascota);
        setModalAbierto(true);
    };

    const handleNuevaMascota = () => {
        setMascotaAEditar(null);
        setModalAbierto(true);
    };

    const mascotasFiltradas = mascotas.filter(m => 
        m.NombreMascota.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Lógica temporal de paginación en cliente (simulando la del servidor)
    const totalPaginas = Math.ceil(mascotasFiltradas.length / tamanoPagina);
    const indiceUltimo = paginaActual * tamanoPagina;
    const indicePrimero = indiceUltimo - tamanoPagina;
    const mascotasPaginadas = mascotasFiltradas.slice(indicePrimero, indiceUltimo);

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
                    <h2 className="tituloMascotas">Mis mascotas</h2>
                    <p className="subtituloMascotas">Presiona cualquier tarjeta para ver los detalles de la mascota</p>
                </div>
                <button className="botonAgregar" onClick={handleNuevaMascota}>Nueva Mascota</button>
            </div>

            <div className="barraFiltros">
                <div className="contenedorBuscador">
                    <input 
                        type="text" 
                        className="inputBuscadorMascotas" 
                        placeholder="Buscar por el nombre del paciente"
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
                                setPaginaActual(1); // Reiniciar a pag 1
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
                            disabled={paginaActual >= totalPaginas}
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>

            {cargando ? (
                <div className="estadoCargandoMascotas">
                    <div className="spinnerMascotas"></div>
                    <p>Obteniendo información del servidor...</p>
                </div>
            ) : mascotas.length === 0 ? (
                <div className="estadoVacioMascotas">
                    <p>Aún no tienes mascotas registradas.</p>
                    <button className="botonAgregar" onClick={handleNuevaMascota}>Nueva Mascota</button>
                </div>
            ) : mascotasFiltradas.length === 0 ? (
                <div className="estadoVacioMascotas">
                    <p>No se encontraron mascotas con ese nombre.</p>
                </div>
            ) : (
                <>
                    <div className="gridMascotas">
                        {mascotasPaginadas.map((mascota) => (
                            <TarjetaMascota 
                                key={mascota.id_Mascota} 
                                mascota={mascota} 
                                onEliminar={handleEliminarMascota}
                                onEditar={handleEditarMascota}
                                onVerCarnet={(m) => {
                                    console.log("Abriendo modal para:", m);
                                    setMascotaCarnetSeleccionada(m);
                                }}
                            />
                        ))}
                    </div>

                </>
            )}

            {/* Modal de Registro de Mascota */}
            {modalAbierto && (
                <FormularioMascotaModal 
                    mascotaAEditar={mascotaAEditar}
                    onClose={() => setModalAbierto(false)} 
                    onGuardar={(datosModificados) => {
                        if (mascotaAEditar) {
                            const mascotasActualizadas = mascotas.map(m => 
                                m.id_Mascota === mascotaAEditar.id_Mascota ? {
                                    ...m,
                                    NombreMascota: datosModificados.nombre,
                                    Especie: datosModificados.especie,
                                    Raza: datosModificados.raza,
                                    Peso: datosModificados.peso,
                                    FechaNacimiento: datosModificados.fechaNacimiento,
                                    Sexo: datosModificados.sexo,
                                    Color: datosModificados.color,
                                    Alergias: datosModificados.alergias
                                } : m
                            );
                            setMascotas(mascotasActualizadas);

                            // Actualizar carnet si está abierto para esta misma mascota
                            if (mascotaCarnetSeleccionada && mascotaCarnetSeleccionada.id_Mascota === mascotaAEditar.id_Mascota) {
                                setMascotaCarnetSeleccionada({
                                    ...mascotaCarnetSeleccionada,
                                    NombreMascota: datosModificados.nombre,
                                    Especie: datosModificados.especie,
                                    Raza: datosModificados.raza,
                                    Peso: datosModificados.peso,
                                    FechaNacimiento: datosModificados.fechaNacimiento,
                                    Sexo: datosModificados.sexo,
                                    Color: datosModificados.color,
                                    Alergias: datosModificados.alergias
                                });
                            }
                        }
                    }}
                />
            )}

            {/* Modal de Carnet de Mascota */}
            {mascotaCarnetSeleccionada && (
                <CarnetMascotaModal 
                    mascotaDto={{
                        idMascota: mascotaCarnetSeleccionada.id_Mascota,
                        nombreMascota: mascotaCarnetSeleccionada.NombreMascota,
                        estado: 'Paciente Activo',
                        especie: mascotaCarnetSeleccionada.Especie,
                        raza: mascotaCarnetSeleccionada.Raza,
                        sexo: mascotaCarnetSeleccionada.Sexo,
                        fechaNacimiento: mascotaCarnetSeleccionada.FechaNacimiento,
                        peso: `${mascotaCarnetSeleccionada.Peso} KG`,
                        color: 'No especificado', // Mock
                        adultoResponsable: {
                            nombreCliente: usuarioSesion.nombre,
                            telefonoContacto: usuarioSesion.telefono
                        },
                        fotoUrl: null,
                        historialVacunas: [
                            { id: 1, vacuna: 'Antirrábica', fecha: '2023-10-05', proxima: '2024-10-05', peso: '24.5 kg' },
                            { id: 2, vacuna: 'Séxtuple', fecha: '2023-12-10', proxima: '2024-12-10', peso: '25.0 kg' }
                        ],
                        historialCitas: [
                            { id: 1, fecha: '2024-01-15 10:00', servicio: 'Consulta General', veterinario: 'Dra. Ana López', estado: 'Completada', descripcion: 'Revisión de rutina' },
                            { id: 2, fecha: '2024-06-20 16:30', servicio: 'Vacunación', veterinario: 'Dr. Mario Gómez', estado: 'Pendiente', descripcion: 'Refuerzo anual' }
                        ]
                    }}
                    onEditar={() => {
                        handleEditarMascota(mascotaCarnetSeleccionada);
                    }}
                    onClose={() => setMascotaCarnetSeleccionada(null)}
                />
            )}
        </div>
    );
};

export default ListaMascotas;
