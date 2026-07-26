import React, { useState } from 'react';
import FormularioLogin from './FormularioLogin';
import RegistroLogin from './RegistroLogin';
import './AuthEstilos.css';

import imagenFondo from '../../assets/imagenes/fondo-login.png';

export default function ContenedorPadre() {
    const [pestanaActiva, setPestanaActiva] = useState('iniciarSesion'); // 'iniciarSesion' | 'registrarse'

    return (
        <div className={`contenedorPrincipal ${pestanaActiva === 'registrarse' ? 'registroCentrado' : ''}`} style={{ backgroundImage: `url(${imagenFondo})` }}>
            <div className="tarjetaAutenticacion animacionAparicion" key={pestanaActiva}>

                {/* Cabecera (Título Centrado) */}
                <div className="encabezadoTitulo">
                    <h2 className="tituloAutenticacion">
                        {pestanaActiva === 'iniciarSesion' ? 'Iniciar Sesión' : 'Registro de Cliente'}
                    </h2>
                </div>

                {/* Renderizado del componente correspondiente */}
                <div className="cuerpoAutenticacion">
                    {pestanaActiva === 'iniciarSesion' ? (
                        <FormularioLogin cambiarARegistro={() => setPestanaActiva('registrarse')} />
                    ) : (
                        <RegistroLogin cambiarALogin={() => setPestanaActiva('iniciarSesion')} />
                    )}
                </div>

            </div>
        </div>
    );
}
