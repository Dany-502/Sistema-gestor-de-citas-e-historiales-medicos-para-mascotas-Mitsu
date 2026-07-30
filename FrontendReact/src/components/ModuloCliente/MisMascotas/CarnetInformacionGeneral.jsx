import React from 'react';

const CarnetInformacionGeneral = ({ especie, fechaNacimiento, raza, peso, sexo, color, adultoResponsable }) => {
    return (
        <div className="infoGeneralGrid">
            {/* Grid de Datos de la Mascota */}
            <div className="datosMascotaGrid">
                <div className="datoItem">
                    <span className="datoLabel">Especie</span>
                    <span className="datoValor">{especie || 'N/A'}</span>
                </div>
                <div className="datoItem">
                    <span className="datoLabel">Fecha de Nacimiento</span>
                    <span className="datoValor">{fechaNacimiento || 'N/A'}</span>
                </div>
                <div className="datoItem">
                    <span className="datoLabel">Raza</span>
                    <span className="datoValor">{raza || 'N/A'}</span>
                </div>
                <div className="datoItem">
                    <span className="datoLabel">Peso</span>
                    <span className="datoValor">{peso || 'N/A'}</span>
                </div>
                <div className="datoItem">
                    <span className="datoLabel">Sexo</span>
                    <span className="datoValor">{sexo || 'N/A'}</span>
                </div>
                <div className="datoItem">
                    <span className="datoLabel">Color</span>
                    <span className="datoValor">{color || 'N/A'}</span>
                </div>
            </div>

            {/* Tarjeta Adulto Responsable */}
            <div className="tarjetaResponsable">
                <div className="responsableItem">
                    <span className="datoLabel">Adulto Responsable</span>
                    <span className="datoValor">{typeof adultoResponsable === 'string' ? adultoResponsable : (adultoResponsable?.nombreCliente || adultoResponsable || 'N/A')}</span>
                </div>
                <div className="responsableItem">
                    <span className="datoLabel">Teléfono de Contacto</span>
                    <span className="datoValor">{adultoResponsable?.telefonoContacto || 'Registrado en Directorio'}</span>
                </div>
            </div>
        </div>
    );
};

export default CarnetInformacionGeneral;
