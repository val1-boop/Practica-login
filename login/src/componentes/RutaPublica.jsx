import { Navigate } from "react-router-dom";
import { usarAuth } from "../context/ContextoAuth";

// Este componente evita que un usuario con sesión entre al login
export default function RutaPublica({ children }) {

  const { usuarioActual } = usarAuth();

  // Si hay sesión abierta
  if (usuarioActual) {

    // Si es admin → vuelve a admin
    if (usuarioActual.rol === "admin") {
      return <Navigate to="/admin" />;
    }

    // Si es usuario normal → perfil
    return <Navigate to="/perfil" />;
  }

  // Si no hay sesión → puede entrar al login
  return children;
}