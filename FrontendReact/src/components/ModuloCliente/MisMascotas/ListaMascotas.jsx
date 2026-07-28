import React, { useState, useEffect } from 'react';
import './ListaMascotasEstilos.css';
import TarjetaMascota from './TarjetaMascota';
import FormularioMascotaModal from './FormularioMascotaModal';
import CarnetMascotaModal from './CarnetMascotaModal';
import Swal from 'sweetalert2';
import { mascotaService, clienteService } from '../../../services/api';

const ListaMascotas = () => {
    const [cargando, setCargando] = useState(true);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const [tamanoPagina, setTamanoPagina] = useState(5);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [mascotaCarnetSeleccionada, setMascotaCarnetSeleccionada] = useState(null);
    const [mascotaAEditar, setMascotaAEditar] = useState(null);

    const [usuarioSesion, setUsuarioSesion] = useState({
        nombre: "Cliente Mitsu",
        telefono: ""
    });

    const [mascotas, setMascotas] = useState([]);

    // Cargar perfil de usuario y lista de mascotas desde el backend
    const cargarDatos = async () => {
        setCargando(true);
        try {
            const perfil = await clienteService.obtenerPerfil();
            if (perfil) {
                setUsuarioSesion({
                    nombre: perfil.nombreCompleto || perfil.nombre,
                    telefono: perfil.telefono
                });
            }

            const listaMascotas = await mascotaService.obtenerMascotas();
            setMascotas(listaMascotas || []);
        } catch (error) {
            console.error("Error al cargar datos de mascotas/perfil:", error);
            // Si el token falló o no hay sesión
            Swal.fire({
                title: 'Error de Conexión',
                text: error.message || 'No se pudieron obtener las mascotas del servidor.',
                icon: 'error',
                confirmButtonColor: '#e74c3c'
            });
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const handleEliminarMascota = (mascota) => {
        const idMascota = mascota.id_Mascota || mascota.idMascota;
        const nombreMascota = mascota.NombreMascota || mascota.nombreMascota;

        Swal.fire({
            title: `¿Estás seguro de eliminar a ${nombreMascota}?`,
            text: "Esta acción no se puede revertir y borrará todo su historial.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e74c3c',
            cancelButtonColor: '#a0aec0',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await mascotaService.eliminarMascota(idMascota);
                    setMascotas(prev => prev.filter(m => (m.id_Mascota || m.idMascota) !== idMascota));

                    Swal.fire({
                        title: '¡Eliminada!',
                        text: 'La mascota ha sido eliminada correctamente de la base de datos.',
                        icon: 'success',
                        confirmButtonColor: '#00bcd4'
                    });
                } catch (err) {
                    Swal.fire({
                        title: 'Error',
                        text: err.message || 'No se pudo eliminar la mascota.',
                        icon: 'error',
                        confirmButtonColor: '#e74c3c'
                    });
                }
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

    const handleGuardarMascotaExitoso = async (datosForm, isEdicion) => {
        try {
            if (isEdicion && mascotaAEditar) {
                const idMascota = mascotaAEditar.id_Mascota || mascotaAEditar.idMascota;
                const actualizada = await mascotaService.actualizarMascota(idMascota, datosForm);
                
                setMascotas(prev => prev.map(m => (m.id_Mascota || m.idMascota) === idMascota ? actualizada : m));

                if (mascotaCarnetSeleccionada && (mascotaCarnetSeleccionada.id_Mascota || mascotaCarnetSeleccionada.idMascota) === idMascota) {
                    setMascotaCarnetSeleccionada(actualizada);
                }

                Swal.fire({
                    title: '¡Datos Actualizados!',
                    text: 'La información se guardó correctamente en el servidor.',
                    icon: 'success',
                    confirmButtonColor: '#00bcd4',
                    timer: 2500,
                    timerProgressBar: true
                });
            } else {
                const nuevaMascota = await mascotaService.registrarMascota(datosForm);
                setMascotas(prev => [nuevaMascota, ...prev]);

                Swal.fire({
                    title: '¡Mascota Registrada!',
                    text: 'Tu mascota ha sido añadida con éxito a tu cuenta.',
                    icon: 'success',
                    confirmButtonColor: '#00bcd4',
                    timer: 2500,
                    timerProgressBar: true
                });
            }
            setModalAbierto(false);
        } catch (error) {
            Swal.fire({
                title: 'Error al Guardar',
                text: error.message || 'Hubo un fallo al comunicar con la base de datos.',
                icon: 'error',
                confirmButtonColor: '#e74c3c'
            });
        }
    };

    const mascotasFiltradas = mascotas.filter(m => {
        const nombre = m.NombreMascota || m.nombreMascota || '';
        return nombre.toLowerCase().includes(busqueda.toLowerCase());
    });

    // Lógica de paginación
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
                <div className="gridMascotas">
                    {mascotasPaginadas.map((mascota) => (
                        <TarjetaMascota 
                            key={mascota.id_Mascota || mascota.idMascota} 
                            mascota={mascota} 
                            onEliminar={handleEliminarMascota}
                            onEditar={handleEditarMascota}
                            onVerCarnet={(m) => {
                                setMascotaCarnetSeleccionada(m);
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Modal de Registro/Edición de Mascota */}
            {modalAbierto && (
                <FormularioMascotaModal 
                    mascotaAEditar={mascotaAEditar}
                    onClose={() => setModalAbierto(false)} 
                    onGuardar={(datosForm) => handleGuardarMascotaExitoso(datosForm, !!mascotaAEditar)}
                />
            )}

            {/* Modal de Carnet de Mascota */}
            {mascotaCarnetSeleccionada && (
                <CarnetMascotaModal 
                    mascotaDto={{
                        idMascota: mascotaCarnetSeleccionada.id_Mascota || mascotaCarnetSeleccionada.idMascota,
                        nombreMascota: mascotaCarnetSeleccionada.NombreMascota || mascotaCarnetSeleccionada.nombreMascota,
                        estado: 'Paciente Activo',
                        especie: mascotaCarnetSeleccionada.Especie || mascotaCarnetSeleccionada.especie,
                        raza: mascotaCarnetSeleccionada.Raza || mascotaCarnetSeleccionada.raza,
                        sexo: mascotaCarnetSeleccionada.Sexo || mascotaCarnetSeleccionada.sexo,
                        fechaNacimiento: mascotaCarnetSeleccionada.FechaNacimiento || mascotaCarnetSeleccionada.fechaNacimiento,
                        peso: mascotaCarnetSeleccionada.Peso ? `${mascotaCarnetSeleccionada.Peso} KG` : 'No registrado',
                        color: mascotaCarnetSeleccionada.Color || mascotaCarnetSeleccionada.color || 'No especificado',
                        adultoResponsable: {
                            nombreCliente: usuarioSesion.nombre,
                            telefonoContacto: usuarioSesion.telefono
                        },
                        fotoUrl: mascotaCarnetSeleccionada.fotoUrl || null,
                        historialVacunas: [],
                        historialCitas: []
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
