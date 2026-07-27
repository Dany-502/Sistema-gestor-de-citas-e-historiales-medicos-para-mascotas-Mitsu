import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/imagenes/Mitsu-logo.png';
import iconInicio from '../../../assets/iconos/casa.png';
import iconCitas from '../../../assets/iconos/calendario.png';
import iconMascotas from '../../../assets/iconos/mascotas.png';
import iconMedicos from '../../../assets/iconos/medico.png';
import './NavegacionEstilos.css';

const Sidebar = () => {
  return (
    <aside className="sidebar-cliente">
      <div className="sidebar-logo">
        <img src={logo} alt="Mitsu Logo" />
      </div>
      
      <nav className="sidebar-menu">
        <NavLink 
          to="/cliente/dashboard" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconInicio} alt="Inicio" className="menu-icon" />
          <span>Inicio</span>
        </NavLink>
        <NavLink 
          to="/cliente/citas" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconCitas} alt="Mis Citas" className="menu-icon" />
          <span>Mis citas</span>
        </NavLink>
        <NavLink 
          to="/cliente/mascotas" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconMascotas} alt="Mis Mascotas" className="menu-icon" />
          <span>Mis mascotas</span>
        </NavLink>
        <NavLink 
          to="/cliente/medicos" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconMedicos} alt="Médicos" className="menu-icon" />
          <span>Médicos</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
