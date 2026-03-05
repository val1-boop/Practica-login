import { usarAuth } from "../context/ContextoAuth";
import Boton from "../componentes/Boton";
import { useNavigate } from "react-router-dom";
import "../estilos.css";

export default function Perfil() {

  // Obtenemos el usuario autenticado y la función para cerrar sesión
  const { usuarioActual, cerrarSesion } = usarAuth();

  const navegar = useNavigate();

  // Función para cerrar sesión
  const salir = () => {
    cerrarSesion();
    navegar("/");
  };

  // Si por alguna razón no hay usuario, no renderizamos nada
  if (!usuarioActual) {
    return <p>No hay usuario autenticado</p>;
  }

  return (
    <div className="contenedor-centro">
      <div className="tarjeta">

        <h2>Perfil</h2>

        <p><strong>Usuario:</strong> {usuarioActual.user}</p>
        <p><strong>Nombre:</strong> {usuarioActual.nombreCompleto}</p>
        <p><strong>Rol:</strong> {usuarioActual.rol}</p>

        <Boton texto="Cerrar Sesión" accion={salir} />

      </div>
    </div>
  );
}