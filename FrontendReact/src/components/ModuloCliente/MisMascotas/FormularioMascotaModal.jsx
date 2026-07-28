import React, { useState, useRef } from 'react';
import './FormularioMascotaModalEstilos.css';
import Swal from 'sweetalert2';

const FormularioMascotaModal = ({ mascotaAEditar, onGuardar, onClose }) => {
    const [fotoPrevia, setFotoPrevia] = useState(
        mascotaAEditar ? (mascotaAEditar.fotoUrl || mascotaAEditar.imagen || null) : null
    );
    const fileInputRef = useRef(null);
    const esEdicion = !!mascotaAEditar;

    const [formData, setFormData] = useState({
        nombre: mascotaAEditar ? (mascotaAEditar.NombreMascota || mascotaAEditar.nombreMascota || '') : '',
        especie: mascotaAEditar ? (mascotaAEditar.Especie || mascotaAEditar.especie || '') : '',
        raza: mascotaAEditar ? (mascotaAEditar.Raza || mascotaAEditar.raza || '') : '',
        fechaNacimiento: mascotaAEditar ? (mascotaAEditar.FechaNacimiento || mascotaAEditar.fechaNacimiento || '') : '',
        sexo: mascotaAEditar ? (mascotaAEditar.Sexo || mascotaAEditar.sexo || '') : '',
        color: mascotaAEditar ? (mascotaAEditar.Color || mascotaAEditar.color || '') : '',
        peso: mascotaAEditar ? (mascotaAEditar.Peso !== undefined ? mascotaAEditar.Peso : mascotaAEditar.peso || '') : '',
        alergias: mascotaAEditar ? (mascotaAEditar.Alergias || mascotaAEditar.alergias || '') : '',
        informacionAdicional: mascotaAEditar ? (mascotaAEditar.informacionAdicional || mascotaAEditar.descripcion || '') : ''
    });

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Enviar datos al padre (ListaMascotas) que llamará al backend real
        if (onGuardar) {
            onGuardar({
                nombreMascota: formData.nombre,
                especie: formData.especie,
                raza: formData.raza,
                fechaNacimiento: formData.fechaNacimiento || null,
                sexo: formData.sexo,
                color: formData.color,
                peso: formData.peso ? parseFloat(formData.peso) : null,
                alergias: formData.alergias,
                descripcion: formData.informacionAdicional,
                informacionAdicional: formData.informacionAdicional,
                fotoUrl: fotoPrevia
            });
        }
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>{esEdicion ? "Editar Mascota" : "Registrar Mascota"}</h2>
                    <button className="btnCerrarModal" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modalBody">
                        <div className="gridFormularioMascota">
                            {/* Columna Foto */}
                            <div className="columnaFoto">
                                <label style={{ fontSize: '13px', fontWeight: '700', color: '#333' }}>Foto</label>
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
                                <div className="previewFoto">
                                    {fotoPrevia ? (
                                        <img src={fotoPrevia} alt="Previsualización" />
                                    ) : (
                                        <span className="placeholderFoto">Imagen</span>
                                    )}
                                </div>
                            </div>

                            {/* Columna Datos */}
                            <div className="columnaDatos">
                                <div className="formGroup">
                                    <label>Nombre</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Especies</label>
                                    <select name="especie" value={formData.especie} onChange={handleInputChange} required>
                                        <option value="">Especies</option>
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div className="formGroup">
                                    <label>Raza</label>
                                    <input type="text" name="raza" placeholder="Ej. Labrador, Mestizo" value={formData.raza} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Fecha de Nacimiento</label>
                                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} required />
                                </div>
                                <div className="formGroup">
                                    <label>Sexo</label>
                                    <select name="sexo" value={formData.sexo} onChange={handleInputChange} required>
                                        <option value="">Sexo</option>
                                        <option value="Macho">Macho</option>
                                        <option value="Hembra">Hembra</option>
                                    </select>
                                </div>

                                <div className="formGroup">
                                    <label>Color</label>
                                    <input type="text" name="color" value={formData.color} onChange={handleInputChange} required />
                                </div>
                                <div className="formGroup">
                                    <label>Peso (kg)</label>
                                    <input type="number" step="0.1" name="peso" value={formData.peso} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup fullWidth">
                                    <label>Alergias</label>
                                    <input type="text" name="alergias" placeholder="Especifique alergias o 'Ninguna'" value={formData.alergias} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup fullWidth">
                                    <label>Información adicional</label>
                                    <textarea
                                        name="informacionAdicional"
                                        placeholder="Información adicional o caracteristicas"
                                        value={formData.informacionAdicional}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="modalFooter">
                        <button type="button" className="btnCancelarMascota" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="btnGuardarMascota">
                            {esEdicion ? "Actualizar Datos" : "Guardar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioMascotaModal;
