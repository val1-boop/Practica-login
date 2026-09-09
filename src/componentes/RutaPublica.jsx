import { Navigate } from "react-router-dom";
import { usarAuth } from "../context/ContextoAuth";

export default function RutaPublica({ children }) {

  const { usuarioActual } = usarAuth();

  // Si ya hay sesión
  if (usuarioActual) {

    if (usuarioActual.rol === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/perfil" replace />;
  }

  return children;
}