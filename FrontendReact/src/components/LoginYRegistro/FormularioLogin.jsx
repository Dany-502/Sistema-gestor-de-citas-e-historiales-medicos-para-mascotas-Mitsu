import React, { useState } from 'react';
import ojo from '../../assets/iconos/ojo.png'
import ojoCruzado from '../../assets/iconos/ojos-cruzados.png'

export default function FormularioLogin({ cambiarARegistro, alIniciarSesion }) {
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    // Estados para las indicaciones requeridas
    const [errores, setErrores] = useState({});
    const [estaCargando, setEstaCargando] = useState(false);
    const [errorRed, setErrorRed] = useState('');

    const validarFormulario = () => {
        const nuevosErrores = {};

        // Validación básica de correo
        if (!correoElectronico) {
            nuevosErrores.correoElectronico = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
            nuevosErrores.correoElectronico = 'Ingresa un correo electrónico válido';
        }

        // Validación básica de contraseña
        if (!contrasena) {
            nuevosErrores.contrasena = 'La contraseña es obligatoria';
        } else if (contrasena.length < 6) {
            nuevosErrores.contrasena = 'La contraseña debe tener al menos 6 caracteres';
        }

        setErrores(nuevosErrores);
        // Retorna true si no hay errores
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        // Limpiamos errores de red previos
        setErrorRed('');

        // Ejecutar validaciones locales primero
        if (!validarFormulario()) {
            return;
        }

        // Activamos estado de carga
        setEstaCargando(true);

        try {
            const respuesta = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    correoElectronico,
                    contrasena
                })
            });

            const datos = await respuesta.json();

            if (!respuesta.ok) {
                throw new Error(datos.error || datos.message || 'Credenciales incorrectas');
            }

            // Guardar el token JWT en localStorage
            if (datos.token) {
                localStorage.setItem('token', datos.token);
            }

            alert('¡Inicio de sesión exitoso!');
            if (alIniciarSesion) {
                alIniciarSesion();
            }

        } catch (error) {
            setErrorRed(error.message || 'Error de conexión con el servidor');
        } finally {
            setEstaCargando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio}>

            {/* Mensaje de error de red o de API (reemplazo del alert) */}
            {errorRed && (
                <div className="mensajeErrorGlobal">
                    {errorRed}
                </div>
            )}

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Correo Electronico</label>
                <input
                    type="email"
                    className={`campoTexto ${errores.correoElectronico ? 'campoConError' : ''}`}
                    placeholder="Ingresa tu correo"
                    value={correoElectronico}
                    onChange={(e) => setCorreoElectronico(e.target.value)}
                    disabled={estaCargando}
                />
                {/* Mensaje de validación en tiempo real */}
                {errores.correoElectronico && <span className="textoError">{errores.correoElectronico}</span>}
            </div>

            <div className="grupoEntrada">
                <label className="etiquetaCampo">
                    <span>Contraseña</span>
                    <span className="enlaceOlvido">¿Olvidaste la contraseña?</span>
                </label>
                <div className="contenedorInputRelativo">
                    <input
                        type={mostrarContrasena ? "text" : "password"}
                        className={`campoTexto ${errores.contrasena ? 'campoConError' : ''}`}
                        placeholder="Ingresa tu contraseña"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        disabled={estaCargando}
                    />
                    <span className="iconoOjo" onClick={() => !estaCargando && setMostrarContrasena(!mostrarContrasena)}>
                        {mostrarContrasena ? <img src={ojo} alt="Ojo" /> : <img src={ojoCruzado} alt="Ojo Cruzado" />}
                    </span>
                </div>
                {/* Mensaje de validación en tiempo real */}
                {errores.contrasena && <span className="textoError">{errores.contrasena}</span>}
            </div>

            <button
                type="submit"
                className="botonAccion botonAcceder"
                disabled={estaCargando}
                style={{ opacity: estaCargando ? 0.7 : 1, cursor: estaCargando ? 'not-allowed' : 'pointer' }}
            >
                {estaCargando ? 'Accediendo...' : 'Acceder'}
            </button>

            <div className="textoPie">
                <span style={{ textDecoration: 'underline' }}>¿Todavia no tienes una cuenta?</span>{' '}
                <span className="enlaceCrearCuenta" onClick={() => !estaCargando && cambiarARegistro()}>
                    Cree una ahora
                </span>
            </div>

        </form>
    );
}