import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usarAuth } from "../context/ContextoAuth";
import CampoTexto from "../componentes/CampoTexto";
import Boton from "../componentes/Boton";
import "../estilos.css";

export default function Login() {

  // Estados para guardar lo que escribe el usuario
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");

  // Accedemos a la función del contexto
  const { iniciarSesion } = usarAuth();

  const navegar = useNavigate();

  // Función que se ejecuta al presionar el botón
  const manejarLogin = () => {

    // Intentamos iniciar sesión
    const usuarioLogueado = iniciarSesion(usuario, contrasena);

    if (usuarioLogueado) {

      // Si es administrador
      if (usuarioLogueado.rol === "admin") {
        navegar("/admin");
      }

      // Si es usuario normal
      else {
        navegar("/perfil");
      }

    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="contenedor-centro">
      <div className="tarjeta-login">

        <h2>Iniciar Sesión</h2>

        {/* Campo de usuario */}
        <CampoTexto
          tipo="text"
          placeholder="Usuario"
          valor={usuario}
          alCambiar={(e) => setUsuario(e.target.value)}
        />

        {/* Campo de contraseña */}
        <CampoTexto
          tipo="password"
          placeholder="Contraseña"
          valor={contrasena}
          alCambiar={(e) => setContrasena(e.target.value)}
        />

        {/* Botón para iniciar sesión */}
        <Boton texto="Entrar" accion={manejarLogin} />

      </div>
    </div>
  );
}