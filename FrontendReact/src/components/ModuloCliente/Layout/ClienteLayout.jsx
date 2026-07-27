import React from 'react';
import Navbar from '../Navegacion/Navbar';
import Sidebar from '../Navegacion/Sidebar';
import { Outlet } from 'react-router-dom';
import '../Navegacion/NavegacionEstilos.css';

const ClienteLayout = () => {
  return (
    <div className="layout-cliente">
      <Sidebar />
      <div className="contenido-principal">
        <Navbar />
        {/* El Outlet renderizará el componente hijo que corresponda a la ruta (ej. Dashboard) */}
        <main>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default ClienteLayout;
