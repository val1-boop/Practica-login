import { Navigate } from "react-router-dom";
import { usarAuth } from "../context/AuthContext";

export default function RutaProtegida({ children, rolRequerido }) {

  // Obtenemos el usuario autenticado
  const { usuarioActual } = usarAuth();

  // Si no hay sesión iniciada, redirige al login
  if (!usuarioActual) {
    return <Navigate to="/" />;
  }

  // Si la ruta requiere un rol específico
  // y el usuario no lo tiene, lo manda a profile
  if (rolRequerido && usuarioActual.rol !== rolRequerido) {
    return <Navigate to="/profile" />;
  }

  // Si todo está correcto, renderiza el componente hijo
  return children;
}