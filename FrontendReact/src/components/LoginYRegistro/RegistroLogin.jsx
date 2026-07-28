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

    const validarFormulario = () => {
        const nuevosErrores = {};
        
        if (!nombre) nuevosErrores.nombre = 'Obligatorio';
        if (!apPaterno) nuevosErrores.apPaterno = 'Obligatorio';
        if (!apMaterno) nuevosErrores.apMaterno = 'Obligatorio';
        if (!direccion) nuevosErrores.direccion = 'La dirección es obligatoria';
        if (!telefono) nuevosErrores.telefono = 'El teléfono es obligatorio';
        
        if (!correoElectronico) {
            nuevosErrores.correoElectronico = 'El correo es obligatorio';
        } else if (!/\S+@\S+\.\S+/.test(correoElectronico)) {
            nuevosErrores.correoElectronico = 'Correo inválido';
        }
        
        if (!contrasena) {
            nuevosErrores.contrasena = 'La contraseña es obligatoria';
        } else if (contrasena.length < 6) {
            nuevosErrores.contrasena = 'Mínimo 6 caracteres';
        }
        
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
            const respuesta = await fetch('http://localhost:8080/api/auth/registro', {
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
            
            {/* Mensaje de error global */}
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
                    onChange={(e) => setNombre(e.target.value)} 
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
                        onChange={(e) => setApPaterno(e.target.value)} 
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
                        onChange={(e) => setApMaterno(e.target.value)} 
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
                    onChange={(e) => setDireccion(e.target.value)} 
                    disabled={estaCargando}
                />
                {errores.direccion && <span className="textoError">{errores.direccion}</span>}
            </div>

            <div className="grupoEntrada">
                <label className="etiquetaCampo">Teléfono</label>
                <input 
                    type="tel" 
                    className={`campoTexto ${errores.telefono ? 'campoConError' : ''}`} 
                    placeholder="Ingresa tu teléfono" 
                    value={telefono} 
                    onChange={(e) => setTelefono(e.target.value)} 
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
                    onChange={(e) => setCorreoElectronico(e.target.value)} 
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
                        onChange={(e) => setContrasena(e.target.value)} 
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
