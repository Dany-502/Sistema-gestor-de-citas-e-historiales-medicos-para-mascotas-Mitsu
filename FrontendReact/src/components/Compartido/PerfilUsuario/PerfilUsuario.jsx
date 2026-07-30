import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { clienteService } from '../../../services/api';
import './PerfilUsuarioEstilos.css';

const PerfilUsuario = () => {
    const [cargando, setCargando] = useState(true);
    const [perfil, setPerfil] = useState({
        nombre: '',
        apPaterno: '',
        apMaterno: '',
        email: '',
        telefono: '',
        direccion: '',
        rol: ''
    });


    useEffect(() => {
        const cargarPerfilReal = async () => {
            const rolActual = localStorage.getItem('rol') || 'Cliente';
            let datosCargados = null;

            try {
                if (rolActual === 'CLIENTE' || rolActual === 'Cliente') {
                    const datosCliente = await clienteService.obtenerPerfil();
                    if (datosCliente) {
                        datosCargados = {
                            nombre: datosCliente.nombre || '',
                            apPaterno: datosCliente.apPaterno || '',
                            apMaterno: datosCliente.apMaterno || '',
                            email: datosCliente.correoElectronico || datosCliente.correo || '',
                            telefono: datosCliente.telefono || '',
                            direccion: datosCliente.direccion || '',
                            rol: 'Cliente'
                        };
                    }
                }
            } catch (err) {
                console.error("Error al obtener perfil desde backend, usando respaldo local:", err);
            }

            if (!datosCargados) {
                if (rolActual === 'ADMIN' || rolActual === 'Administrador' || rolActual === 'Admin') {
                    datosCargados = {
                        nombre: 'Administrador',
                        apPaterno: 'Mitsu',
                        apMaterno: '',
                        email: 'admin@mitsu.com',
                        telefono: '555-0000',
                        direccion: 'Av. Mitsu Veterinaria 123',
                        rol: 'Administrador'
                    };
                } else if (rolActual === 'VETERINARIO' || rolActual === 'Veterinario') {
                    datosCargados = {
                        nombre: 'Dr. Alejandro',
                        apPaterno: 'Fernández',
                        apMaterno: 'Luna',
                        email: 'dr.alejandro@mitsu.com',
                        telefono: '555-1234',
                        direccion: 'Consultorio 1, Clínica Mitsu',
                        rol: 'Veterinario'
                    };
                } else {
                    datosCargados = {
                        nombre: 'Miguel',
                        apPaterno: 'Alonso',
                        apMaterno: 'Heredia',
                        email: 'miguel@mitsu.com',
                        telefono: '555-9876',
                        direccion: 'Calle Los Pinos 45, Residencial Mitsu',
                        rol: 'Cliente'
                    };
                }
            }

            setPerfil(datosCargados);
            setCargando(false);
        };

        cargarPerfilReal();
    }, []);

    const handlePerfilChange = (e) => {
        const { name, value } = e.target;
        setPerfil(prev => ({ ...prev, [name]: value }));
    };


    const guardarPerfil = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¡Perfil Actualizado!',
            text: 'Tus datos personales se han guardado correctamente.',
            icon: 'success',
            confirmButtonColor: '#10b981',
            timer: 2000
        });
    };


    if (cargando) {
        return (
            <div className="contenedorPerfilUniversal perfilCargando">
                <p className="textoCargandoPerfil">Cargando información del perfil...</p>
            </div>
        );
    }

    return (
        <div className="contenedorPerfilUniversal">
            <div className="cabeceraPerfil">
                <div className="textosCabecera">
                    <h2 className="tituloPerfil">Mi Perfil</h2>
                </div>
            </div>

            <div className="cuerpoPerfilPlano">
                <div className="seccionAvatarPerfilPlano">
                    <div className="avatarPerfilFrame">
                        <div className="avatarPerfilContent">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                    <div className="infoPrincipalPerfil">
                        <h2>{perfil.nombre} {perfil.apPaterno}</h2>
                        <span className="badgeRolPerfil">{perfil.rol}</span>
                    </div>
                </div>

                <div className="gridPerfilSecciones">

                    {/* SECCIÓN DATOS PERSONALES */}
                    <div className="seccionPerfil">
                        <h3>Información Personal</h3>
                        <form onSubmit={guardarPerfil}>
                            <div className="perfilFormGrid">
                                <div className="perfilFormGroup">
                                    <label>Nombre(s)</label>
                                    <input type="text" name="nombre" value={perfil.nombre} onChange={handlePerfilChange} required />
                                </div>
                                <div className="perfilFormGroup">
                                    <label>Apellido Paterno</label>
                                    <input type="text" name="apPaterno" value={perfil.apPaterno} onChange={handlePerfilChange} required />
                                </div>
                                <div className="perfilFormGroup">
                                    <label>Apellido Materno</label>
                                    <input type="text" name="apMaterno" value={perfil.apMaterno} onChange={handlePerfilChange} />
                                </div>
                                <div className="perfilFormGroup">
                                    <label>Teléfono de Contacto</label>
                                    <input type="tel" name="telefono" value={perfil.telefono} onChange={handlePerfilChange} />
                                </div>
                                <div className="perfilFormGroup fullWidth">
                                    <label>Dirección</label>
                                    <input type="text" name="direccion" value={perfil.direccion} onChange={handlePerfilChange} placeholder="Calle, Número, Colonia, Ciudad..." />
                                </div>
                                <div className="perfilFormGroup fullWidth">
                                    <label>Correo Electrónico</label>
                                    <input type="email" name="email" value={perfil.email} disabled title="El correo no se puede cambiar" />
                                </div>
                            </div>
                            <div className="accionesPerfilFooter">
                                <button type="submit" className="btnGuardarPerfil">Guardar Cambios</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default PerfilUsuario;
