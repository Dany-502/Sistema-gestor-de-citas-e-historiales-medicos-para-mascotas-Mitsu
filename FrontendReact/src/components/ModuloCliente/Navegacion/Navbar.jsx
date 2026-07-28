import React, { useState, useEffect } from 'react';
import iconFlecha from '../../../assets/iconos/angulo-hacia-abajo.png';
import './NavegacionEstilos.css';
import { clienteService } from '../../../services/api';

const Navbar = ({ alCerrarSesion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState('Cliente Mitsu');

  useEffect(() => {
    let cancelado = false;
    async function cargarPerfil() {
      try {
        const perfil = await clienteService.obtenerPerfil();
        if (!cancelado && perfil) {
          const primerNombre = perfil.nombre || perfil.nombreCompleto?.split(' ')[0] || 'Cliente';
          setNombreUsuario(primerNombre);
        }
      } catch (err) {
        // Si no está autenticado aún o hay error de token
      }
    }
    cargarPerfil();
    return () => { cancelado = true; };
  }, []);

  return (
    <nav className="navbar-cliente">
      <div className="navbar-spacer"></div>
      
      <div className="navbar-user-section">
        <button className="user-pill" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="user-avatar">
            <div className="avatar-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <span className="user-name">{nombreUsuario}</span>
          <img src={iconFlecha} alt="Desplegar" className={`dropdown-icon ${menuOpen ? 'open' : ''}`} />
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item">Perfil</button>
            <button className="dropdown-item" onClick={alCerrarSesion}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
