import { usarAuth } from "../context/ContextoAuth";
import { usuarios } from "../data/Usuarios";
import TablaUsuarios from "../componentes/TablaUsuarios";
import Boton from "../componentes/Boton";
import { useNavigate } from "react-router-dom";
import "../estilos.css";


export default function Admin() {

  const { usuarioActual, cerrarSesion } = usarAuth();
  const navegar = useNavigate();

  const salir = () => {
    cerrarSesion();
    navegar("/");
  };

  return (
    <div className="contenedor-centro">
      <div className="tarjeta-admin">

        <h2>Panel de Administrador</h2>

        {/* Datos del admin */}
        <p><strong>Bienvenido:</strong> {usuarioActual.nombreCompleto}</p>

        {/* Tabla con todos los usuarios */}
        <TablaUsuarios listaUsuarios={usuarios} />

        <Boton texto="Cerrar Sesión" accion={salir} />

      </div>
    </div>
  );
}