// ===============================
// IMPORTACIONES
// ===============================

// createContext -> Crea el contexto global
// useContext -> Permite consumir el contexto fácilmente
// useState -> Guarda el estado (usuario autenticado)
// useEffect -> Ejecuta código cuando el componente se monta
import { createContext, useContext, useState, useEffect } from "react";

// Importamos nuestro arreglo de usuarios (simula una base de datos)
import { usuarios } from "../data/Usuarios";


// ===============================
// CREACIÓN DEL CONTEXTO
// ===============================

// Creamos el contexto de autenticación.
// Este será el contenedor global que compartirá la sesión en toda la app.
const ContextoAuth = createContext();


// ===============================
// COMPONENTE PROVIDER
// ===============================

// AuthProvider envuelve toda la aplicación.
// Todo lo que esté dentro podrá acceder a la autenticación.
export function AuthProvider({ children }) {

  // ===============================
  // ESTADO GLOBAL DE SESIÓN
  // ===============================

  // usuarioActual guardará la información del usuario logueado.
  // Inicia en null porque al abrir la app nadie ha iniciado sesión.
  const [usuarioActual, setUsuarioActual] = useState(null);


  // ===============================
  // PERSISTENCIA DE SESIÓN
  // ===============================

  // Este useEffect se ejecuta UNA SOLA VEZ cuando la app carga.
  // Sirve para recuperar la sesión guardada en el navegador.
  useEffect(() => {

    // Buscamos si existe un usuario guardado en localStorage
    const usuarioGuardado = localStorage.getItem("usuario");

    // Si existe, lo convertimos de texto (JSON) a objeto
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }

  }, []); // El arreglo vacío significa que solo se ejecuta al montar el componente.


  // ===============================
  // FUNCIÓN PARA INICIAR SESIÓN
  // ===============================

  const iniciarSesion = (usuario, contrasena) => {

    // Buscamos en el arreglo si existe un usuario
    // que coincida con el usuario y contraseña ingresados
    const encontrado = usuarios.find(
      (u) => u.user === usuario && u.contraseña === contrasena
    );

    // Si encontramos coincidencia
    if (encontrado) {

      // Guardamos el usuario en el estado global
      setUsuarioActual(encontrado);

      // También lo guardamos en localStorage
      // Esto permite que la sesión no se pierda al refrescar la página
      localStorage.setItem("usuario", JSON.stringify(encontrado));

      // Devolvemos el usuario encontrado
      return encontrado;
    }

    // Si no coincide, devolvemos null
    return null;
  };


  // ===============================
  // FUNCIÓN PARA CERRAR SESIÓN
  // ===============================

  const cerrarSesion = () => {

    // Eliminamos el usuario del estado
    setUsuarioActual(null);

    // Eliminamos el usuario guardado en el navegador
    localStorage.removeItem("usuario");
  };


  // ===============================
  // VALORES DISPONIBLES GLOBALMENTE
  // ===============================

  // Aquí definimos qué datos y funciones estarán disponibles
  // en cualquier componente de la aplicación.
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


// ===============================
// HOOK PERSONALIZADO
// ===============================

// Este hook permite usar el contexto fácilmente.
// En lugar de importar useContext y ContextoAuth en cada archivo,
// solo usamos: const { usuarioActual } = usarAuth();
export function usarAuth() {
  return useContext(ContextoAuth);
}