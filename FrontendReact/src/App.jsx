import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContenedorPadre from './components/LoginYRegistro/ContenedorPadre';
import ClienteLayout from './components/ModuloCliente/Layout/ClienteLayout';
import ContenedorPrincipal from './components/ModuloCliente/Dashboard/contenedorPrincipal';
import ListaMascotas from './components/ModuloCliente/MisMascotas/ListaMascotas';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública / Login */}
        <Route path="/" element={<ContenedorPadre />} />

        {/* Rutas del Módulo Cliente */}
        <Route path="/cliente" element={<ClienteLayout />}>
          <Route path="dashboard" element={<ContenedorPrincipal />} />
          <Route path="mascotas" element={<ListaMascotas />} />
          {/* Aquí irán citas, etc. */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
