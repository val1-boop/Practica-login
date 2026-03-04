import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import RutaProtegida from "./components/RutaProtegida";
import RutaPublica from "./components/RutaPublica";
import { usarAuth } from "./context/AuthContext";

/*
  Componente Fallback:
  Maneja cualquier ruta que no exista.
  - Si está autenticado → lo manda a /profile
  - Si no está autenticado → lo manda al login
*/
function Fallback() {
  const { usuarioActual } = usarAuth();

  return usuarioActual
    ? <Navigate to="/profile" replace />
    : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 
          Ruta pública:
          SOLO accesible si NO hay sesión activa.
          Si el usuario ya está autenticado,
          RutaPublica lo redirige automáticamente.
        */}
        <Route
          path="/"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        {/*
          Ruta protegida:
          Cualquier usuario autenticado puede verla.
        */}
        <Route
          path="/profile"
          element={
            <RutaProtegida>
              <Profile />
            </RutaProtegida>
          }
        />

        {/*
          Ruta protegida por rol:
          Solo usuarios con rol "admin".
        */}
        <Route
          path="/admin"
          element={
            <RutaProtegida rolRequerido="admin">
              <Admin />
            </RutaProtegida>
          }
        />

        {/*
          Ruta comodín:
          Captura cualquier ruta escrita manualmente.
        */}
        <Route path="*" element={<Fallback />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;