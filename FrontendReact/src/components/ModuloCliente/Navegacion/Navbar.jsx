import React, { useState } from 'react';
import iconFlecha from '../../../assets/iconos/angulo-hacia-abajo.png';
import './NavegacionEstilos.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Temporal: luego se sacará del backend/contexto
  const usuario = {
    nombre: "Miguel Alberto"
  };

  return (
    <nav className="navbar-cliente">
      <div className="navbar-spacer"></div>
      
      <div className="navbar-user-section">
        <button className="user-pill" onClick={() => setMenuOpen(!menuOpen)}>
          <div className="user-avatar">
            {/* Contenedor simulando el icono de usuario de la captura */}
            <div className="avatar-placeholder">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <span className="user-name">{usuario.nombre}</span>
          <img src={iconFlecha} alt="Desplegar" className={`dropdown-icon ${menuOpen ? 'open' : ''}`} />
        </button>

        {menuOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item">Perfil</button>
            <button className="dropdown-item">Cerrar Sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
