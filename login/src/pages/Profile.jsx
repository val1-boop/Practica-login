import { usarAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Profile() {

  const { usuarioActual, logout } = usarAuth();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    logout(); // limpia sesión
    navigate("/"); // regresa al login
  };

  return (
    <div className="container mt-5">

      <h2>Perfil</h2>

      <p><strong>Nombre:</strong> {usuarioActual.nombreCompleto}</p>
      <p><strong>Rol:</strong> {usuarioActual.rol}</p>

      {/* Solo si es admin muestra botón para panel */}
      {usuarioActual.rol === "admin" && (
        <Button className="me-2" onClick={() => navigate("/admin")}>
          Ir al Panel Admin
        </Button>
      )}

      <Button className="btn-danger" onClick={cerrarSesion}>
        Cerrar Sesión
      </Button>

    </div>
  );
}