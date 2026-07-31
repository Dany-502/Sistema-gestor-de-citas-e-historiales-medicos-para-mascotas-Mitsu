import React, { useState, useRef } from 'react';
import '../../ModuloCliente/MisMascotas/FormularioMascotaModalEstilos.css'; // Reutilizamos estilos base de modales
import './FormularioMedicoAdminModal.css';
import Swal from 'sweetalert2';

const FormularioMedicoAdminModal = ({ medicoAEditar, onGuardar, onClose }) => {
    const [fotoPrevia, setFotoPrevia] = useState(
        medicoAEditar ? (medicoAEditar.fotoUrl || null) : null
    );
    const fileInputRef = useRef(null);
    const esEdicion = !!medicoAEditar;

    const diasPorDefecto = [
        { dia: 'Lunes', activo: true, inicio: '09:00', fin: '18:00' },
        { dia: 'Martes', activo: true, inicio: '09:00', fin: '18:00' },
        { dia: 'Miércoles', activo: true, inicio: '09:00', fin: '18:00' },
        { dia: 'Jueves', activo: true, inicio: '09:00', fin: '18:00' },
        { dia: 'Viernes', activo: true, inicio: '09:00', fin: '18:00' },
        { dia: 'Sábado', activo: false, inicio: '09:00', fin: '14:00' },
        { dia: 'Domingo', activo: false, inicio: '09:00', fin: '14:00' }
    ];

    const [formData, setFormData] = useState({
        nombre: medicoAEditar ? medicoAEditar.nombre : '',
        apPaterno: medicoAEditar ? medicoAEditar.apPaterno : '',
        apMaterno: medicoAEditar ? (medicoAEditar.apMaterno || '') : '',
        especialidad: medicoAEditar ? medicoAEditar.especialidad : '',
        cedula: medicoAEditar ? (medicoAEditar.cedula || '') : '',
        telefono: medicoAEditar ? medicoAEditar.telefono : '',
        correoElectronico: medicoAEditar ? medicoAEditar.correo : '',
        contrasena: '',
        horarios: medicoAEditar && medicoAEditar.horarios ? 
                  diasPorDefecto.map(d => {
                      const hExtra = medicoAEditar.horarios.find(h => h.diaSemana === d.dia);
                      if (hExtra) return { dia: d.dia, activo: true, inicio: hExtra.horaInicio, fin: hExtra.horaFin };
                      return { ...d, activo: false };
                  }) 
                  : diasPorDefecto
    });

    const handleHorarioChange = (index, campo, valor) => {
        setFormData(prev => {
            const nuevosHorarios = [...prev.horarios];
            nuevosHorarios[index] = { ...nuevosHorarios[index], [campo]: valor };
            return { ...prev, horarios: nuevosHorarios };
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoPrevia(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validación de contraseña
        if (!esEdicion || formData.contrasena) {
            const password = formData.contrasena || '';
            const tieneMayuscula = /[A-Z]/.test(password);
            const tieneNumero = /[0-9]/.test(password);
            if (!tieneMayuscula || !tieneNumero || password.length < 6) {
                Swal.fire({
                    title: 'Contraseña inválida', 
                    text: 'La contraseña debe tener al menos 6 caracteres, 1 mayúscula y 1 número.', 
                    icon: 'warning',
                    confirmButtonColor: '#3b82f6'
                });
                return;
            }
        }
        
        try {
            if (onGuardar) {
                await onGuardar({
                    ...formData,
                    fotoUrl: fotoPrevia
                });
            }

            Swal.fire({
                title: esEdicion ? '¡Médico Actualizado!' : '¡Médico Registrado!',
                text: esEdicion ? 'Los datos del veterinario se actualizaron con éxito.' : 'El veterinario ha sido registrado en el directorio.',
                icon: 'success',
                confirmButtonColor: '#10b981',
                timer: 2000
            });

            onClose();
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error.message || 'Hubo un problema al procesar la solicitud. Verifica que el correo no esté repetido.',
                icon: 'error',
                confirmButtonColor: '#ef4444'
            });
        }
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>{esEdicion ? "Editar Perfil Médico" : "Registrar Nuevo Médico"}</h2>
                    <button className="btnCerrarModal" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modalBody">
                        <div className="gridFormularioMascota">
                            {/* Columna Foto */}
                            <div className="columnaFoto">
                                <label className="form-label-foto">Foto de Perfil</label>
                                <button
                                    type="button"
                                    className="btnSeleccionarArchivo"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    Seleccionar archivo
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="inputArchivoOculto"
                                    accept="image/*"
                                />
                                <div className="previewFoto preview-foto-medico">
                                    {fotoPrevia ? (
                                        <img src={fotoPrevia} alt="Previsualización" className="img-foto-medico" />
                                    ) : (
                                        <span className="placeholderFoto">Avatar</span>
                                    )}
                                </div>
                            </div>

                            {/* Columna Datos */}
                            <div className="columnaDatos">
                                <div className="formGroup">
                                    <label>Nombre(s)*</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Apellido Paterno*</label>
                                    <input type="text" name="apPaterno" value={formData.apPaterno} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Apellido Materno</label>
                                    <input type="text" name="apMaterno" value={formData.apMaterno} onChange={handleInputChange} />
                                </div>

                                <div className="formGroup">
                                    <label>Especialidad*</label>
                                    <input type="text" name="especialidad" placeholder="Ej. Medicina General, Cirujano" value={formData.especialidad} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Cédula Profesional</label>
                                    <input type="text" name="cedula" value={formData.cedula} onChange={handleInputChange} />
                                </div>

                                <div className="formGroup">
                                    <label>Teléfono*</label>
                                    <input type="tel" name="telefono" value={formData.telefono} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup fullWidth">
                                    <label>Correo Electrónico (Contacto)*</label>
                                    <input type="email" name="correoElectronico" value={formData.correoElectronico} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup fullWidth">
                                    <label>Contraseña de Acceso{esEdicion ? '' : '*'}</label>
                                    <input 
                                        type="password" 
                                        name="contrasena" 
                                        placeholder={esEdicion ? "Dejar en blanco para no cambiar" : "Mínimo 6 caracteres"} 
                                        value={formData.contrasena || ''} 
                                        onChange={handleInputChange} 
                                        autoComplete="new-password"
                                        required={!esEdicion} 
                                    />
                                </div>

                                <div className="formGroup fullWidth form-group-horarios">
                                    <label className="label-horarios-titulo">Días de Atención y Horarios</label>
                                    <div className="contenedor-horarios">
                                        {formData.horarios.map((horario, index) => (
                                            <div key={horario.dia} className={`item-horario ${horario.activo ? 'activo' : 'inactivo'}`}>
                                                <label className="label-checkbox-horario">
                                                    <input 
                                                        type="checkbox" 
                                                        checked={horario.activo}
                                                        onChange={(e) => handleHorarioChange(index, 'activo', e.target.checked)}
                                                        className="checkbox-horario"
                                                    />
                                                    <span className={`texto-dia-horario ${horario.activo ? 'activo' : 'inactivo'}`}>{horario.dia}</span>
                                                </label>
                                                
                                                {horario.activo ? (
                                                    <div className="contenedor-inputs-horario">
                                                        <div className="input-group-horario">
                                                            <span className="label-input-horario">De:</span>
                                                            <input 
                                                                type="time" 
                                                                value={horario.inicio}
                                                                onChange={(e) => handleHorarioChange(index, 'inicio', e.target.value)}
                                                                className="input-time-horario"
                                                            />
                                                        </div>
                                                        <div className="input-group-horario">
                                                            <span className="label-input-horario">A:</span>
                                                            <input 
                                                                type="time" 
                                                                value={horario.fin}
                                                                onChange={(e) => handleHorarioChange(index, 'fin', e.target.value)}
                                                                className="input-time-horario"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="texto-dia-descanso">Día de descanso</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modalFooter">
                        <button type="button" className="btnCancelarMascota" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btnGuardarMascota btn-guardar-medico">
                            {esEdicion ? "Actualizar Perfil" : "Registrar Médico"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioMedicoAdminModal;
