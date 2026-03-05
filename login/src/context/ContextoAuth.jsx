// Importamos funciones necesarias de React
import { createContext, useContext, useState } from "react";

// Importamos el arreglo central de usuarios
import { usuarios } from "../data/Usuarios";

// Creamos el contexto
const ContextoAuth = createContext();


// Componente proveedor del contexto
// Aquí vive el estado global de autenticación
export function AuthProvider({ children }) {

  // Estado que guarda al usuario que inició sesión
  const [usuarioActual, setUsuarioActual] = useState(null);


  // Función para iniciar sesión
// Función para iniciar sesión
const iniciarSesion = (usuario, contrasena) => {

  // Buscamos si existe un usuario que coincida
  const encontrado = usuarios.find(
    (u) => u.user === usuario && u.contraseña === contrasena
  );

  // Si existe, lo guardamos en el estado
  if (encontrado) {
    setUsuarioActual(encontrado);
    return encontrado; // ← devolvemos el usuario
  }

  // Si no coincide
    return null;
  };


  // Función para cerrar sesión
  const cerrarSesion = () => {
    setUsuarioActual(null);
  };


  // Lo que estará disponible en toda la app
  return (
    <ContextoAuth.Provider
      value={{
        usuarioActual,
        iniciarSesion,
        cerrarSesion
      }}
    >
      {children}
    </ContextoAuth.Provider>
  );
}


// Hook personalizado para usar el contexto fácilmente
export function usarAuth() {
  return useContext(ContextoAuth);
}