import { Navigate } from "react-router-dom";
import { usarAuth } from "../context/ContextoAuth";

// Este componente protege rutas privadas
export default function RutaProtegida({ children, rolRequerido }) {

  const { usuarioActual } = usarAuth();

  // Si no hay sesión → lo manda al login
  if (!usuarioActual) {
    return <Navigate to="/" />;
  }

  // Si la ruta requiere un rol específico
  if (rolRequerido && usuarioActual.rol !== rolRequerido) {
    return <Navigate to="/perfil" />;
  }

  // Si cumple las condiciones → muestra la vista
  return children;
}