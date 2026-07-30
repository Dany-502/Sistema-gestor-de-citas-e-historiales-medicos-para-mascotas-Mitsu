import React, { useState, useRef, useEffect } from 'react';
import '../../ModuloCliente/MisMascotas/FormularioMascotaModalEstilos.css';
import './FormularioMascotaAdminModal.css';
import Swal from 'sweetalert2';
import { clienteService } from '../../../services/api';

const FormularioMascotaAdminModal = ({ isOpen, onClose, onSave }) => {
    const [fotoPrevia, setFotoPrevia] = useState(null);
    const fileInputRef = useRef(null);

    const [clientesDisponibles, setClientesDisponibles] = useState([
        { idCliente: 1, nombre: 'María Fernández', correo: 'maria@gmail.com' },
        { idCliente: 2, nombre: 'Carlos Romero', correo: 'carlos@gmail.com' }
    ]);

    const [formData, setFormData] = useState({
        idCliente: '',
        nombre: '',
        especie: '',
        raza: '',
        fechaNacimiento: '',
        sexo: '',
        color: '',
        peso: '',
        alergias: '',
        informacionAdicional: ''
    });

    useEffect(() => {
        if (isOpen) {
            // Cargar lista real de clientes
            const fetchClientes = async () => {
                try {
                    const data = await clienteService.obtenerTodos();
                    if (data && data.length > 0) {
                        const clientesMapeados = data.map(c => ({
                            idCliente: c.idCliente || c.id,
                            nombre: `${c.nombre} ${c.apPaterno || ''}`.trim(),
                            correo: c.correoElectronico || c.correo
                        }));
                        setClientesDisponibles(clientesMapeados);
                    }
                } catch (e) {
                    console.error("Error al cargar clientes para modal mascota admin:", e);
                }
            };
            fetchClientes();

            // Reset form
            setFormData({
                idCliente: '',
                nombre: '',
                especie: '',
                raza: '',
                fechaNacimiento: '',
                sexo: '',
                color: '',
                peso: '',
                alergias: '',
                informacionAdicional: ''
            });
            setFotoPrevia(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

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
        
        if (!formData.idCliente) {
            Swal.fire('Error', 'Por favor, selecciona un dueño (cliente) para esta mascota.', 'warning');
            return;
        }

        if (onSave) {
            onSave({
                idCliente: formData.idCliente,
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
        
        Swal.fire({
            title: '¡Mascota Creada (Admin)!',
            text: 'El paciente ha sido registrado y asignado al cliente.',
            icon: 'success',
            confirmButtonColor: '#17c3b2',
            timer: 2000
        });

        onClose();
    };

    return (
        <div className="modalOverlay" onClick={onClose}>
            <div className="modalContent" onClick={e => e.stopPropagation()}>
                <div className="modalHeader">
                    <h2>Registrar Nuevo Paciente (Admin)</h2>
                    <button className="btnCerrarModal" onClick={onClose}>&times;</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="modalBody">
                        <div className="gridFormularioMascota">
                            {/* Columna Foto */}
                            <div className="columnaFoto">
                                <label className="form-label-foto">Foto</label>
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
                                <div className="formGroup fullWidth form-group-dueno">
                                    <label className="label-dueno">Dueño de la mascota (Cliente)*</label>
                                    <select 
                                        name="idCliente" 
                                        value={formData.idCliente} 
                                        onChange={handleInputChange} 
                                        required
                                        className="select-dueno"
                                    >
                                        <option value="">Selecciona un cliente</option>
                                        {clientesDisponibles.map(c => (
                                            <option key={c.idCliente} value={c.idCliente}>{c.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="formGroup">
                                    <label>Nombre*</label>
                                    <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Especies*</label>
                                    <select name="especie" value={formData.especie} onChange={handleInputChange} required>
                                        <option value="">Especies</option>
                                        <option value="Perro">Perro</option>
                                        <option value="Gato">Gato</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                </div>
                                <div className="formGroup">
                                    <label>Raza*</label>
                                    <input type="text" name="raza" placeholder="Ej. Labrador, Mestizo" value={formData.raza} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup">
                                    <label>Fecha de Nacimiento*</label>
                                    <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleInputChange} required />
                                </div>
                                <div className="formGroup">
                                    <label>Sexo*</label>
                                    <select name="sexo" value={formData.sexo} onChange={handleInputChange} required>
                                        <option value="">Sexo</option>
                                        <option value="Macho">Macho</option>
                                        <option value="Hembra">Hembra</option>
                                    </select>
                                </div>

                                <div className="formGroup">
                                    <label>Color*</label>
                                    <input type="text" name="color" value={formData.color} onChange={handleInputChange} required />
                                </div>
                                <div className="formGroup">
                                    <label>Peso (kg)*</label>
                                    <input type="number" step="0.1" name="peso" value={formData.peso} onChange={handleInputChange} required />
                                </div>

                                <div className="formGroup fullWidth">
                                    <label>Alergias*</label>
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
                        <button type="submit" className="btnGuardarMascota btn-guardar-admin">
                            Guardar Expediente
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormularioMascotaAdminModal;
