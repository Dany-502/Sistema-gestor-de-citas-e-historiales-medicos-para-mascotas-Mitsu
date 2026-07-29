import React, { useState } from 'react';
import iconFlecha from '../../../assets/iconos/angulo-hacia-abajo.png';
import '../../ModuloCliente/Navegacion/NavegacionEstilos.css';

const NavbarVeterinario = ({ alCerrarSesion }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const nombreUsuario = 'Miguel Alonso'; // Dummy data para el veterinario

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.clear();
    if (alCerrarSesion) {
      alCerrarSesion();
    }
    window.location.href = '/';
  };

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
            <button className="dropdown-item">Perfil Profesional</button>
            <button className="dropdown-item" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarVeterinario;
