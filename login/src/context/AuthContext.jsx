import { createContext, useContext, useState, useEffect } from "react";
import { usuarios } from "../data/Usuarios";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  // 🔥 Inicializamos desde localStorage
  const [usuarioActual, setUsuarioActual] = useState(() => {
    const guardado = localStorage.getItem("usuario");
    return guardado ? JSON.parse(guardado) : null;
  });

  const login = (user, contraseña) => {

    const encontrado = usuarios.find(
      (u) => u.user === user && u.contraseña === contraseña
    );

    if (encontrado) {
      setUsuarioActual(encontrado);
      localStorage.setItem("usuario", JSON.stringify(encontrado)); // 🔥 guardamos sesión
      return true;
    }

    return false;
  };

  const logout = () => {
    setUsuarioActual(null);
    localStorage.removeItem("usuario"); // 🔥 limpiamos sesión
  };

  return (
    <AuthContext.Provider value={{ usuarioActual, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function usarAuth() {
  return useContext(AuthContext);
}