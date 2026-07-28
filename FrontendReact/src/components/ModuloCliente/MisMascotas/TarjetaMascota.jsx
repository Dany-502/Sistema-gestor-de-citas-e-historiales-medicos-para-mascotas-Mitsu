import React, { useState } from 'react';
import './TarjetaMascotaEstilos.css';
import iconPata from '../../../assets/iconos/pata.png';

const TarjetaMascota = ({ mascota, onEliminar, onEditar, onVerCarnet }) => {
    const [menuAbierto, setMenuAbierto] = useState(false);

    const nombre = mascota.NombreMascota || mascota.nombreMascota || 'Sin nombre';
    const id = mascota.id_Mascota || mascota.idMascota || '';
    const especie = mascota.Especie || mascota.especie || '';
    const raza = mascota.Raza || mascota.raza || '';
    const peso = mascota.Peso !== undefined ? mascota.Peso : (mascota.peso !== undefined ? mascota.peso : '-');
    const fechaNac = mascota.FechaNacimiento || mascota.fechaNacimiento || '';
    const sexo = mascota.Sexo || mascota.sexo || '-';
    const alergias = mascota.Alergias || mascota.alergias || 'Ninguna';

    const calcularEdad = (fechaNacimiento) => {
        if (!fechaNacimiento) return 'Desconocida';
        const fecha = new Date(fechaNacimiento);
        const hoy = new Date();
        
        let años = hoy.getFullYear() - fecha.getFullYear();
        let meses = hoy.getMonth() - fecha.getMonth();
        
        if (meses < 0 || (meses === 0 && hoy.getDate() < fecha.getDate())) {
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
                    {(mascota.fotoUrl || mascota.imagen) ? (
                        <img src={mascota.fotoUrl || mascota.imagen} alt={nombre} className="iconoAvatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                        <img src={iconPata} alt="Mascota" className="iconoAvatar" />
                    )}
                </div>
                <div className="infoBasicaMascota">
                    <h3 className="nombreMascota">
                        {nombre} <span className="idMascota">{id}</span>
                    </h3>
                    <p className="razaMascota">{especie} - {raza}</p>
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
                    <strong>Peso:</strong> {peso} kg
                </div>
                <div className="datoSecundarioItem">
                    <strong>Edad:</strong> {calcularEdad(fechaNac)}
                </div>
                <div className="datoSecundarioItem">
                    <strong>Sexo:</strong> {sexo}
                </div>
            </div>

            <div className="etiquetaAlergias">
                <strong>Alergias:</strong> {alergias}
            </div>

            <button 
                className="botonVerCarnet" 
                onClick={(e) => {
                    e.preventDefault();
                    if (onVerCarnet) onVerCarnet(mascota);
                }}
            >
                Ver Carnet
            </button>
        </div>
    );
};

export default TarjetaMascota;
