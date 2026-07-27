import React, { useState } from 'react';
import './TarjetaMascotaEstilos.css';
import iconPata from '../../../assets/iconos/pata.png';

const TarjetaMascota = ({ mascota, onEliminar, onEditar, onVerCarnet }) => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    // Función para calcular la edad (aproximada para UI) simulando la buena práctica de usar FechaNacimiento
    const calcularEdad = (fechaNacimiento) => {
        const fechaNac = new Date(fechaNacimiento);
        const hoy = new Date();
        
        let años = hoy.getFullYear() - fechaNac.getFullYear();
        let meses = hoy.getMonth() - fechaNac.getMonth();
        
        if (meses < 0 || (meses === 0 && hoy.getDate() < fechaNac.getDate())) {
            años--;
            meses += 12;
        }

        if (años > 0) {
            return `${años} año${años > 1 ? 's' : ''}`;
        } else if (meses > 0) {
            return `${meses} mes${meses > 1 ? 'es' : ''}`;
        } else {
            return 'Menos de 1 mes';
        }
    };

    const toggleMenu = () => {
        setMenuAbierto(!menuAbierto);
    };

    return (
        <div className="tarjetaMascotaCompleta">
            <div className="cabeceraTarjeta">
                <div className="avatarMascota">
                    <img src={iconPata} alt="Mascota" className="iconoAvatar" />
                </div>
                <div className="infoBasicaMascota">
                    <h3 className="nombreMascota">
                        {mascota.NombreMascota} <span className="idMascota">{mascota.id_Mascota}</span>
                    </h3>
                    <p className="razaMascota">{mascota.Especie} - {mascota.Raza}</p>
                </div>
                <button className="botonOpciones" onClick={toggleMenu}>
                    ...
                </button>

                {menuAbierto && (
                    <div className="menuOpciones">
                        <button 
                            className="botonEditar" 
                            onClick={(e) => {
                                e.stopPropagation();
                                onEditar(mascota);
                                setMenuAbierto(false);
                            }}
                        >
                            Editar mascota
                        </button>
                        <button 
                            className="botonEliminar" 
                            onClick={(e) => {
                                e.stopPropagation();
                                onEliminar(mascota);
                                setMenuAbierto(false);
                            }}
                        >
                            Eliminar mascota
                        </button>
                    </div>
                )}
            </div>

            <div className="datosSecundarios">
                <div className="datoSecundarioItem">
                    <strong>Peso:</strong> {mascota.Peso} kg
                </div>
                <div className="datoSecundarioItem">
                    <strong>Edad:</strong> {calcularEdad(mascota.FechaNacimiento)}
                </div>
                <div className="datoSecundarioItem">
                    <strong>Sexo:</strong> {mascota.Sexo}
                </div>
            </div>

            <div className="etiquetaAlergias">
                <strong>Alergias:</strong> {mascota.Alergias}
            </div>

            <button 
                className="botonVerCarnet" 
                onClick={(e) => {
                    e.preventDefault();
                    console.log("Click en Ver Carnet de:", mascota.NombreMascota);
                    if (onVerCarnet) onVerCarnet(mascota);
                }}
            >
                Ver Carnet
            </button>
        </div>
    );
};

export default TarjetaMascota;
