import React, { useState } from 'react';
import ContenedorPadre from './components/LoginYRegistro/ContenedorPadre';
import Inicio from './components/Inicio/Inicio';

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
    <>
      {sesionIniciada ? (
        <Inicio cerrarSesion={manejarCerrarSesion} />
      ) : (
        <ContenedorPadre alIniciarSesion={manejarLoginExitoso} />
      )}
    </>
  );
}

export default App;
