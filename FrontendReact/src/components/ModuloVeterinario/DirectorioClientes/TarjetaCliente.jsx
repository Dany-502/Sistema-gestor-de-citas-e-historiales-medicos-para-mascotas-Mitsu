import React from 'react';
import './TarjetaClienteEstilos.css';
import iconoUsuario from '../../../assets/iconos/usuario.png';

const TarjetaCliente = ({ cliente, onVerDetalles }) => {

    const handleVerDetalles = () => {
        if (onVerDetalles) {
            onVerDetalles(cliente);
        }
    };

    return (
        <div className="tarjetaCliente">
            <div className="cabeceraTarjetaCliente">
                <img src={iconoUsuario} alt="Icono Cliente" className="iconoAvatarCliente" />
                <div className="infoBasicaCliente">
                    <h3>{cliente.nombre} {cliente.apPaterno} {cliente.apMaterno}</h3>
                    <span className="etiquetaMascotas">Mascotas: {cliente.cantidadMascotas || 0}</span>
                </div>
            </div>

            <div className="cuerpoTarjetaCliente">
                <div className="gridInfoCliente">
                    <div className="itemInfoCliente">
                        <span className="labelInfo">Teléfono</span>
                        <span className="valorInfo">{cliente.telefono || 'No especificado'}</span>
                    </div>
                    <div className="itemInfoCliente">
                        <span className="labelInfo">Correo Electrónico</span>
                        <span className="valorInfo contacto">{cliente.correoElectronico || 'No especificado'}</span>
                    </div>
                </div>
            </div>

            <div className="pieTarjetaCliente">
                <button className="botonVerDetalles" onClick={handleVerDetalles}>
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};

export default TarjetaCliente;
