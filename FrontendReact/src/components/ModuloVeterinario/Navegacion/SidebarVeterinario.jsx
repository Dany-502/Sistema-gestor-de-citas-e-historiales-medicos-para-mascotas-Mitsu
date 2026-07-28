import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../../assets/imagenes/Mitsu-logo.png';
import iconInicio from '../../../assets/iconos/casa.png';
import iconCitas from '../../../assets/iconos/calendario.png';
import iconMascotas from '../../../assets/iconos/mascotas.png';
import iconMedicos from '../../../assets/iconos/medico.png';
// Reutilizamos los estilos de Navegacion del Cliente
import '../../ModuloCliente/Navegacion/NavegacionEstilos.css';

const SidebarVeterinario = () => {
  return (
    <aside className="sidebar-cliente">
      <div className="sidebar-logo">
        <img src={logo} alt="Mitsu Logo" />
      </div>

      <nav className="sidebar-menu">
        <NavLink
          to="/veterinario/dashboard"
          className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconInicio} alt="Inicio" className="menu-icon" />
          <span>Inicio</span>
        </NavLink>
        <NavLink
          to="/veterinario/agenda"
          className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconCitas} alt="Agenda de trabajo" className="menu-icon" />
          <span>Mi agenda</span>
        </NavLink>
        <NavLink
          to="/veterinario/expedientes"
          className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconMedicos} alt="Expedientes medicos" className="menu-icon" />
          <span>Expedientes</span>
        </NavLink>
        <NavLink
          to="/veterinario/directorio"
          className={({ isActive }) => isActive ? "menu-link active" : "menu-link"}
        >
          <img src={iconMascotas} alt="Directorio de clientes" className="menu-icon" />
          <span>Clientes</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SidebarVeterinario;
