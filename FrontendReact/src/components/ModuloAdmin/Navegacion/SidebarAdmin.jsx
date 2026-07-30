import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/imagenes/Mitsu-logo.png';
import iconUsuarios from '../../../assets/iconos/usuario.png';
import iconCitas from '../../../assets/iconos/calendario.png';
import iconMascotas from '../../../assets/iconos/mascotas.png';
import iconMedicos from '../../../assets/iconos/medico.png';
import '../../ModuloCliente/Navegacion/NavegacionEstilos.css'; // Reutilizando CSS base

const SidebarAdmin = () => {
  return (
    <aside className="sidebar-cliente">
      <div className="sidebar-logo">
        <img src={logo} alt="Mitsu Logo" />
      </div>
      
      <nav className="sidebar-menu">
        <NavLink 
          to="/admin/usuarios" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconUsuarios} alt="Gestión Usuarios" className="menu-icon" />
          <span>Gestión Usuarios</span>
        </NavLink>
        <NavLink 
          to="/admin/agenda" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconCitas} alt="Agenda Global" className="menu-icon" />
          <span>Agenda Global</span>
        </NavLink>
        <NavLink 
          to="/admin/expedientes" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconMascotas} alt="Expedientes Totales" className="menu-icon" />
          <span>Expedientes Totales</span>
        </NavLink>
        <NavLink 
          to="/admin/medicos" 
          className={({isActive}) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconMedicos} alt="Gestión Médicos" className="menu-icon" />
          <span>Gestión Médicos</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
