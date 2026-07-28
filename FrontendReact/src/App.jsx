import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ContenedorPadre from './components/LoginYRegistro/ContenedorPadre';
import ClienteLayout from './components/ModuloCliente/Layout/ClienteLayout';
import ContenedorPrincipal from './components/ModuloCliente/Dashboard/contenedorPrincipal';
import ListaMascotas from './components/ModuloCliente/MisMascotas/ListaMascotas';
import ListaMedicos from './components/ModuloCliente/DirectorioMedicos/ListaMedicos';
import MisCitas from './components/ModuloCliente/MisCitas/MisCitas';

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
          element={<ClienteLayout />}
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
