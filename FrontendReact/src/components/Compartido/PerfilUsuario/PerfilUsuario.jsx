import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
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
        // Simulando carga de datos desde el backend (/api/auth/me)
        setTimeout(() => {
            const rolActual = localStorage.getItem('rol') || 'Cliente';
            let mockData = {};

            if (rolActual === 'Administrador' || rolActual === 'Admin') {
                mockData = {
                    nombre: 'Super',
                    apPaterno: 'Admin',
                    apMaterno: '',
                    email: 'admin@mitsu.com',
                    telefono: '555-0000',
                    direccion: 'Av. Veterinaria 123, Ciudad',
                    rol: 'Administrador'
                };
            } else if (rolActual === 'Veterinario') {
                mockData = {
                    nombre: 'Miguel',
                    apPaterno: 'Alonso',
                    apMaterno: 'Pérez',
                    email: 'miguel@mitsu.com',
                    telefono: '555-1234',
                    direccion: 'Consultorio 4, Clínica Mitsu',
                    rol: 'Veterinario'
                };
            } else {
                mockData = {
                    nombre: 'María',
                    apPaterno: 'Fernández',
                    apMaterno: 'López',
                    email: 'maria@gmail.com',
                    telefono: '555-9876',
                    direccion: 'Calle Los Pinos 45, Residencial Flora',
                    rol: 'Cliente'
                };
            }

            setPerfil(mockData);
            setCargando(false);
        }, 800);
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
