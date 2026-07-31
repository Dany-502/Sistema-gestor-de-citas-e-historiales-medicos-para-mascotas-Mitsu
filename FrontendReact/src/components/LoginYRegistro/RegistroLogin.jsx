import React, { useState } from 'react';
import ojo from '../../assets/iconos/ojo.png';
import ojoCruzado from '../../assets/iconos/ojos-cruzados.png';

export default function RegistroLogin({ cambiarALogin }) {
    const [nombre, setNombre] = useState('');
    const [apPaterno, setApPaterno] = useState('');
    const [apMaterno, setApMaterno] = useState('');
    const [direccion, setDireccion] = useState('');
    const [telefono, setTelefono] = useState('');
    const [correoElectronico, setCorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [mostrarContrasena, setMostrarContrasena] = useState(false);

    // Estados para las indicaciones requeridas
    const [errores, setErrores] = useState({});
    const [estaCargando, setEstaCargando] = useState(false);
    const [errorRed, setErrorRed] = useState('');

    const validarNombre = (valor) => {
        if (!valor) return 'El nombre es obligatorio';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'El nombre solo debe contener letras';
        return '';
    };

    const validarApPaterno = (valor) => {
        if (!valor) return 'El apellido paterno es obligatorio';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'Solo se permiten letras';
        return '';
    };

    const validarApMaterno = (valor) => {
        if (!valor) return 'El apellido materno es obligatorio';
        if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) return 'Solo se permiten letras';
        return '';
    };

    const validarDireccion = (valor) => {
        if (!valor) return 'La dirección no puede estar vacía';
        return '';
    };

    const validarTelefono = (valor) => {
        if (!valor) return 'El teléfono es obligatorio';
        if (!/^\+52\d{10}$/.test(valor)) return 'Debe ser un número válido iniciando con +52, ej. +521234567890';
        return '';
    };

    const validarCorreo = (valor) => {
        if (!valor) return 'El correo es obligatorio';
        if (!/\S+@\S+\.\S+/.test(valor)) return 'Formato de correo no válido';
        return '';
    };

    const validarContrasena = (valor) => {
        if (!valor) return 'La contraseña es obligatoria';
        if (!/(?=.*[A-Z])(?=.*\d)/.test(valor)) return 'La contraseña debe contener al menos una mayúscula y un número';
        return '';
    };

    const handleChange = (setter, validator, key) => (e) => {
        const val = e.target.value;
        setter(val);
        setErrores(prev => ({ ...prev, [key]: validator(val) }));
    };

    const handleBlur = (validator, key, valor) => () => {
        setErrores(prev => ({ ...prev, [key]: validator(valor) }));
    };

    const validarFormulario = () => {
        const errorNombre = validarNombre(nombre);
        const errorApPaterno = validarApPaterno(apPaterno);
        const errorApMaterno = validarApMaterno(apMaterno);
        const errorDireccion = validarDireccion(direccion);
        const errorTelefono = validarTelefono(telefono);
        const errorCorreo = validarCorreo(correoElectronico);
        const errorContrasena = validarContrasena(contrasena);

        const nuevosErrores = {};
        if (errorNombre) nuevosErrores.nombre = errorNombre;
        if (errorApPaterno) nuevosErrores.apPaterno = errorApPaterno;
        if (errorApMaterno) nuevosErrores.apMaterno = errorApMaterno;
        if (errorDireccion) nuevosErrores.direccion = errorDireccion;
        if (errorTelefono) nuevosErrores.telefono = errorTelefono;
        if (errorCorreo) nuevosErrores.correoElectronico = errorCorreo;
        if (errorContrasena) nuevosErrores.contrasena = errorContrasena;
        
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const manejarRegistro = async (e) => {
        e.preventDefault();
        setErrorRed('');
        
        if (!validarFormulario()) {
            return;
        }

        setEstaCargando(true);
        
        try {
            const respuesta = await fetch('https://mitsu-veterinaria.duckdns.org/api/auth/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apPaterno,
                    apMaterno,
                    direccion,
                    telefono,
                    correoElectronico,
                    contrasena
                })
            });

            const textoRespuesta = await respuesta.text();

            if (!respuesta.ok) {
                try {
                    const errorJson = JSON.parse(textoRespuesta);
                    throw new Error(errorJson.error || errorJson.message || 'Error al registrar el usuario');
                } catch (e) {
                    throw new Error(textoRespuesta || 'Error al conectar con el servidor');
                }
            }

            // Si el registro fue exitoso, cambiar a la vista de login
            cambiarALogin();
            
        } catch (error) {
            setErrorRed(error.message || 'Hubo un error al registrar el usuario');
        } finally {
            setEstaCargando(false);
        }
    };

    return (
        <form onSubmit={manejarRegistro}>
            
            {errorRed && (
                <div className="mensajeErrorGlobal">
                    {errorRed}
                </div>
            )}

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Nombre</label>
                <input 
                    type="text" 
                    className={`campoTexto ${errores.nombre ? 'campoConError' : ''}`} 
                    placeholder="Ingresa tu nombre" 
                    value={nombre} 
                    onChange={handleChange(setNombre, validarNombre, 'nombre')} 
                    onBlur={handleBlur(validarNombre, 'nombre', nombre)}
                    disabled={estaCargando}
                />
                {errores.nombre && <span className="textoError">{errores.nombre}</span>}
            </div>

            <div className="grupoEntrada" style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                    <label className="etiquetaCampo">Apellido Paterno</label>
                    <input 
                        type="text" 
                        className={`campoTexto ${errores.apPaterno ? 'campoConError' : ''}`} 
                        placeholder="Apellido paterno" 
                        value={apPaterno} 
                        onChange={handleChange(setApPaterno, validarApPaterno, 'apPaterno')} 
                        onBlur={handleBlur(validarApPaterno, 'apPaterno', apPaterno)}
                        disabled={estaCargando}
                    />
                    {errores.apPaterno && <span className="textoError">{errores.apPaterno}</span>}
                </div>
                <div style={{ flex: 1 }}>
                    <label className="etiquetaCampo">Apellido Materno</label>
                    <input 
                        type="text" 
                        className={`campoTexto ${errores.apMaterno ? 'campoConError' : ''}`} 
                        placeholder="Apellido materno" 
                        value={apMaterno} 
                        onChange={handleChange(setApMaterno, validarApMaterno, 'apMaterno')} 
                        onBlur={handleBlur(validarApMaterno, 'apMaterno', apMaterno)}
                        disabled={estaCargando}
                    />
                    {errores.apMaterno && <span className="textoError">{errores.apMaterno}</span>}
                </div>
            </div>

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Dirección</label>
                <input 
                    type="text" 
                    className={`campoTexto ${errores.direccion ? 'campoConError' : ''}`} 
                    placeholder="Ingresa tu dirección completa" 
                    value={direccion} 
                    onChange={handleChange(setDireccion, validarDireccion, 'direccion')} 
                    onBlur={handleBlur(validarDireccion, 'direccion', direccion)}
                    disabled={estaCargando}
                />
                {errores.direccion && <span className="textoError">{errores.direccion}</span>}
            </div>

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Teléfono</label>
                <input 
                    type="tel" 
                    className={`campoTexto ${errores.telefono ? 'campoConError' : ''}`} 
                    placeholder="Ej. +521234567890" 
                    value={telefono} 
                    onChange={handleChange(setTelefono, validarTelefono, 'telefono')} 
                    onBlur={handleBlur(validarTelefono, 'telefono', telefono)}
                    disabled={estaCargando}
                />
                {errores.telefono && <span className="textoError">{errores.telefono}</span>}
            </div>

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Correo Electrónico</label>
                <input 
                    type="email" 
                    className={`campoTexto ${errores.correoElectronico ? 'campoConError' : ''}`} 
                    placeholder="Ingresa tu correo" 
                    value={correoElectronico} 
                    onChange={handleChange(setCorreoElectronico, validarCorreo, 'correoElectronico')} 
                    onBlur={handleBlur(validarCorreo, 'correoElectronico', correoElectronico)}
                    disabled={estaCargando}
                />
                {errores.correoElectronico && <span className="textoError">{errores.correoElectronico}</span>}
            </div>

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Contraseña</label>
                <div className="contenedorInputRelativo">
                    <input 
                        type={mostrarContrasena ? "text" : "password"} 
                        className={`campoTexto ${errores.contrasena ? 'campoConError' : ''}`} 
                        placeholder="Crea una Contraseña" 
                        value={contrasena} 
                        onChange={handleChange(setContrasena, validarContrasena, 'contrasena')} 
                        onBlur={handleBlur(validarContrasena, 'contrasena', contrasena)}
                        disabled={estaCargando}
                    />
                    <span className="iconoOjo" onClick={() => !estaCargando && setMostrarContrasena(!mostrarContrasena)}>
                        {mostrarContrasena ? <img src={ojo} alt="Ojo" /> : <img src={ojoCruzado} alt="Ojo Cruzado" />}
                    </span>
                </div>
                {errores.contrasena && <span className="textoError">{errores.contrasena}</span>}
            </div>

            <div className="contenedorBotonesRegistro">
                <button 
                    type="button" 
                    className="botonAccion botonCancelar" 
                    onClick={() => !estaCargando && cambiarALogin()}
                    disabled={estaCargando}
                    style={{ opacity: estaCargando ? 0.7 : 1, cursor: estaCargando ? 'not-allowed' : 'pointer' }}
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    className="botonAccion botonGuardar"
                    disabled={estaCargando}
                    style={{ opacity: estaCargando ? 0.7 : 1, cursor: estaCargando ? 'not-allowed' : 'pointer' }}
                >
                    {estaCargando ? 'Guardando...' : 'Guardar'}
                </button>
            </div>

        </form>
    );
}
