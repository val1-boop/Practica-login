import Tabla from "../components/Tabla";
import Profile from "./Profile";
import { usuarios } from "../data/Usuarios";

export default function Admin() {

  return (
    <div className="container mt-5">

      <h2>Panel de Administrador</h2>

      {/* Tabla que usa .map para mostrar todos los usuarios */}
      <Tabla listaUsuarios={usuarios} />

      <hr />

      {/* También muestra su perfil */}
      <Profile />

    </div>
  );
}