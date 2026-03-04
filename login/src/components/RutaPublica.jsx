import { Navigate } from "react-router-dom";
import { usarAuth } from "../context/AuthContext";

export default function RutaPublica({ children }) {
  const { usuarioActual } = usarAuth();

  // Si ya hay sesión, bloquea el login
  if (usuarioActual) {
    return <Navigate to="/profile" replace />;
  }

  return children;
}