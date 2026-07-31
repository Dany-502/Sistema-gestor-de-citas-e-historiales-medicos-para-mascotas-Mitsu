import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ojo from '../../assets/iconos/ojo.png'
import ojoCruzado from '../../assets/iconos/ojos-cruzados.png'

export default function FormularioLogin({ cambiarARegistro, alIniciarSesion }) {
    const navigate = useNavigate();
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    // Estados para las indicaciones requeridas
    const [errores, setErrores] = useState({});
    const [estaCargando, setEstaCargando] = useState(false);
    const [errorRed, setErrorRed] = useState('');

    const validarCorreo = (valor) => {
        if (!valor) return 'Este campo no puede estar vacío';
        if (!/\S+@\S+\.\S+/.test(valor)) return 'Ingresa un correo electrónico válido';
        return '';
    };

    const validarContrasena = (valor) => {
        if (!valor) return 'Este campo no puede estar vacío';
        return '';
    };

    const handleChangeCorreo = (e) => {
        const valor = e.target.value;
        setCorreoElectronico(valor);
        const error = validarCorreo(valor);
        setErrores(prev => ({ ...prev, correoElectronico: error }));
    };

    const handleChangeContrasena = (e) => {
        const valor = e.target.value;
        setContrasena(valor);
        const error = validarContrasena(valor);
        setErrores(prev => ({ ...prev, contrasena: error }));
    };

    const validarFormulario = () => {
        const errorCorreo = validarCorreo(correoElectronico);
        const errorContrasena = validarContrasena(contrasena);

        const nuevosErrores = {};
        if (errorCorreo) nuevosErrores.correoElectronico = errorCorreo;
        if (errorContrasena) nuevosErrores.contrasena = errorContrasena;

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();

        setErrorRed('');

        if (!validarFormulario()) {
            return;
        }

        setEstaCargando(true);

        try {
            const mailLimpio = (correoElectronico || '').trim().toLowerCase();
            const passLimpia = (contrasena || '').trim();

            let datos;
            try {
                const respuesta = await fetch('https://mitsu-veterinaria.duckdns.org/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        correoElectronico: mailLimpio,
                        contrasena: passLimpia
                    })
                });
                datos = await respuesta.json();
                if (!respuesta.ok) {
                    throw new Error(datos.error || datos.message || 'Credenciales incorrectas');
                }
            } catch (errServidor) {
                throw errServidor;
            }

            if (datos.token) {
                localStorage.setItem('token', datos.token);
            }
            if (datos.rol) {
                localStorage.setItem('rol', datos.rol);
            }

            if (alIniciarSesion) {
                alIniciarSesion();
            }

            if (datos.rol === 'ADMIN') {
                navigate('/admin/usuarios');
            } else if (datos.rol === 'VETERINARIO') {
                navigate('/veterinario/dashboard');
            } else {
                navigate('/cliente/dashboard');
            }

        } catch (error) {
            setErrorRed(error.message || 'Error de conexión con el servidor');
        } finally {
            setEstaCargando(false);
        }
    };

    return (
        <form onSubmit={manejarEnvio}>

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
                    onChange={handleChangeCorreo}
                    onBlur={(e) => setErrores(prev => ({ ...prev, correoElectronico: validarCorreo(e.target.value) }))}
                    disabled={estaCargando}
                />
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
                        onChange={handleChangeContrasena}
                        onBlur={(e) => setErrores(prev => ({ ...prev, contrasena: validarContrasena(e.target.value) }))}
                        disabled={estaCargando}
                    />
                    <span className="iconoOjo" onClick={() => !estaCargando && setMostrarContrasena(!mostrarContrasena)}>
                        {mostrarContrasena ? <img src={ojo} alt="Ojo" /> : <img src={ojoCruzado} alt="Ojo Cruzado" />}
                    </span>
                </div>
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