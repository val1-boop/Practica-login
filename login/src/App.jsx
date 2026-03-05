import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./paginas/Login";
import Perfil from "./paginas/Perfil";
import Admin from "./paginas/Admin";
import RutaProtegida from "./componentes/RutaProtegida";
import RutaPublica from "./componentes/RutaPublica";
import { usarAuth } from "./context/ContextoAuth";

// Ruta inicial que decide a dónde mandar
function RutaInicial() {

  const { usuarioActual } = usarAuth();

  // Si no hay sesión → login
  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  // Si es admin → panel admin
  if (usuarioActual.rol === "admin") {
    return <Navigate to="/admin" />;
  }

  // Si es usuario → perfil
  return <Navigate to="/perfil" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta raíz */}
        <Route path="/" element={<RutaInicial />} />

        {/* Login */}
        <Route
          path="/login"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        {/* Perfil */}
        <Route
          path="/perfil"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolRequerido="admin">
              <Admin />
            </RutaProtegida>
          }
        />

        {/* Cualquier ruta que no exista */}
        <Route path="*" element={<RutaInicial />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;