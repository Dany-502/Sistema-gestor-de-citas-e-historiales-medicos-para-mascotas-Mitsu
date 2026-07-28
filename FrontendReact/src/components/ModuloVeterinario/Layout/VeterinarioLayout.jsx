import React from 'react';
import NavbarVeterinario from '../Navegacion/NavbarVeterinario';
import SidebarVeterinario from '../Navegacion/SidebarVeterinario';
import { Outlet } from 'react-router-dom';
import '../../ModuloCliente/Navegacion/NavegacionEstilos.css'; // Reutilizando CSS del layout base

const VeterinarioLayout = ({ alCerrarSesion }) => {
  return (
    <div className="layout-cliente"> {/* Reutilizando clase base para el grid */}
      <SidebarVeterinario />
      <div className="contenido-principal">
        <NavbarVeterinario alCerrarSesion={alCerrarSesion} />
        {/* El Outlet renderizará el componente hijo que corresponda a la ruta */}
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default VeterinarioLayout;
