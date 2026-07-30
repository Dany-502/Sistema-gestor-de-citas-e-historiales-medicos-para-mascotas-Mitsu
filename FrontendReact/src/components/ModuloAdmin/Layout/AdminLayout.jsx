import React from 'react';
import NavbarAdmin from '../Navegacion/NavbarAdmin';
import SidebarAdmin from '../Navegacion/SidebarAdmin';
import { Outlet } from 'react-router-dom';
import '../../ModuloCliente/Navegacion/NavegacionEstilos.css'; // Reutilizando CSS del layout base

const AdminLayout = ({ alCerrarSesion }) => {
  return (
    <div className="layout-cliente">
      <SidebarAdmin />
      <div className="contenido-principal">
        <NavbarAdmin alCerrarSesion={alCerrarSesion} />
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
