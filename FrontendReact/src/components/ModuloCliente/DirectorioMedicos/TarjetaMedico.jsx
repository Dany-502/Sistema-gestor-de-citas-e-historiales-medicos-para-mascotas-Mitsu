import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TarjetaMedicoEstilos.css';
import iconoMedico from '../../../assets/iconos/medico.png';
import Swal from 'sweetalert2';

const TarjetaMedico = ({ medico, esAdmin = false, onEditar }) => {
    const navigate = useNavigate();

    const handleAgendar = () => {
        navigate('/cliente/mis-citas', { 
            state: { preselectedVeterinario: medico.idVeterinario } 
        });
    };

    return (
        <div className="tarjetaMedico">
            <div className="cabeceraTarjetaMedico">
                <img src={iconoMedico} alt="Icono Médico" className="iconoAvatarMedico" />
                <div className="infoBasicaMedico">
                    <h3>{medico.nombre} {medico.apPaterno} {medico.apMaterno}</h3>
                    <span className="etiquetaEspecialidad">{medico.especialidad}</span>
                </div>
            </div>

            <div className="cuerpoTarjetaMedico">
                <div className="gridInfoMedico">
                    <div className="itemInfoMedico">
                        <span className="labelInfo">Cédula Profesional</span>
                        <span className="valorInfo">{medico.cedula || 'No especificada'}</span>
                    </div>
                    <div className="itemInfoMedico">
                        <span className="labelInfo">Contacto</span>
                        <span className="valorInfo contacto">{medico.correoElectronico}</span>
                    </div>
                </div>

                {medico.horarios && medico.horarios.length > 0 && (
                    <div className="seccionHorarios">
                        <span className="tituloHorarios">
                            Horario de Atención
                        </span>
                        <ul className="listaHorarios">
                            {medico.horarios.map((horario) => (
                                <li key={horario.idHorario} className="itemHorario">
                                    <span className="diaHorario">{horario.diaSemana}:</span>
                                    <span>{horario.horaInicio} - {horario.horaFin}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {esAdmin ? (
                <div className="pieTarjetaMedico admin-view">
                    <button 
                        className="botonAgendar btn-baja-medico"
                        onClick={() => {
                            Swal.fire({
                                title: '¿Eliminar a ' + medico.nombre + '?',
                                text: 'Esta acción no se puede deshacer',
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#ef4444'
                            })
                        }}
                    >
                        Dar de baja
                    </button>
                    <button 
                        className="botonAgendar btn-editar-medico"
                        onClick={onEditar}
                    >
                        Editar Perfil
                    </button>
                </div>
            ) : (
                <div className="pieTarjetaMedico">
                    <button className="botonAgendar" onClick={handleAgendar}>
                        Agendar Cita
                    </button>
                </div>
            )}
        </div>
    );
};

export default TarjetaMedico;
