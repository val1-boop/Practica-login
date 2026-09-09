import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./paginas/Login";
import Perfil from "./paginas/Perfil";
import Admin from "./paginas/Admin";
import RutaProtegida from "./componentes/RutaProtegida";
import RutaPublica from "./componentes/RutaPublica";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta pública */}
        <Route
          path="/login"
          element={
            <RutaPublica>
              <Login />
            </RutaPublica>
          }
        />

        {/* Ruta protegida por defecto */}
        <Route
          path="/"
          element={
            <RutaProtegida>
              <Perfil />
            </RutaProtegida>
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;