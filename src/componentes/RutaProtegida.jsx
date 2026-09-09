import { Navigate } from "react-router-dom";
import { usarAuth } from "../context/ContextoAuth";

export default function RutaProtegida({ children, rolRequerido }) {

  const { usuarioActual } = usarAuth();

  // Si no hay sesión
  if (!usuarioActual) {
    return <Navigate to="/login" replace />;
  }

  // Si requiere rol
  if (rolRequerido && usuarioActual.rol !== rolRequerido) {
    return <Navigate to="/perfil" replace />;
  }

  return children;
}