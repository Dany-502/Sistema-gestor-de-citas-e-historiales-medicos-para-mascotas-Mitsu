import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContenedorPadre from './components/LoginYRegistro/ContenedorPadre';
import ClienteLayout from './components/ModuloCliente/Layout/ClienteLayout';
import ContenedorPrincipal from './components/ModuloCliente/Dashboard/contenedorPrincipal';
import ListaMascotas from './components/ModuloCliente/MisMascotas/ListaMascotas';
import ListaMedicos from './components/ModuloCliente/DirectorioMedicos/ListaMedicos';
import MisCitas from './components/ModuloCliente/MisCitas/MisCitas';

// Modulo Veterinario
import VeterinarioLayout from './components/ModuloVeterinario/Layout/VeterinarioLayout';
import DashboardVeterinario from './components/ModuloVeterinario/DashboardCliente/DashboardVeterinario';
import ExpedientesVeterinario from './components/ModuloVeterinario/Expedientes/ExpedientesVeterinario';
import ListaClientes from './components/ModuloVeterinario/DirectorioClientes/ListaClientes';
import AgendaVeterinario from './components/ModuloVeterinario/Agenda/AgendaVeterinario';

// Modulo Admin
import AdminLayout from './components/ModuloAdmin/Layout/AdminLayout';
import GestionUsuarios from './components/ModuloAdmin/Usuarios/GestionUsuarios';

function App() {
  const [sesionIniciada, setSesionIniciada] = useState(() => {
    return !!localStorage.getItem('token');
  });

  const manejarLoginExitoso = () => {
    setSesionIniciada(true);
  };

  const manejarCerrarSesion = () => {
    localStorage.removeItem('token');
    setSesionIniciada(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública / Login */}
        <Route 
          path="/" 
          element={<ContenedorPadre alIniciarSesion={manejarLoginExitoso} />}
          /* --- SISTEMA PROTEGIDO (Comentado temporalmente para pruebas) ---
          element={
            !sesionIniciada ? (
              <ContenedorPadre alIniciarSesion={manejarLoginExitoso} />
            ) : (
              <Navigate to="/cliente/dashboard" replace />
            )
          } 
          --------------------------------------------------------------- */
        />

        {/* Rutas del Módulo Cliente */}
        <Route 
          path="/cliente" 
          element={<ClienteLayout alCerrarSesion={manejarCerrarSesion} />}
          /* --- SISTEMA PROTEGIDO (Comentado temporalmente para pruebas) ---
          element={
            sesionIniciada ? (
              <ClienteLayout alCerrarSesion={manejarCerrarSesion} />
            ) : (
              <Navigate to="/" replace />
            )
          }
          --------------------------------------------------------------- */
        >
          <Route path="dashboard" element={<ContenedorPrincipal />} />
          <Route path="mascotas" element={<ListaMascotas />} />
          <Route path="medicos" element={<ListaMedicos />} />
          <Route path="citas" element={<MisCitas />} />
          {/* Aquí irán citas, etc. */}
        </Route>

        {/* Rutas del Módulo Veterinario */}
        <Route 
          path="/veterinario" 
          element={<VeterinarioLayout alCerrarSesion={manejarCerrarSesion} />}
        >
          <Route path="dashboard" element={<DashboardVeterinario />} />
          <Route path="expedientes" element={<ExpedientesVeterinario />} />
          <Route path="directorio" element={<ListaClientes />} />
          <Route path="agenda" element={<AgendaVeterinario />} />
        </Route>

        {/* Rutas del Módulo Administrador */}
        <Route 
          path="/admin" 
          element={<AdminLayout alCerrarSesion={manejarCerrarSesion} />}
        >
          <Route path="usuarios" element={<GestionUsuarios />} />
          <Route path="agenda" element={<AgendaVeterinario esAdmin={true} />} />
          <Route path="expedientes" element={<ExpedientesVeterinario esAdmin={true} />} />
          <Route path="medicos" element={<ListaMedicos esAdmin={true} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
