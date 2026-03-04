import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usarAuth } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {

  const [user, setUser] = useState("");
  const [contraseña, setContraseña] = useState("");

  const { login } = usarAuth();
  const navigate = useNavigate();

  const manejarLogin = () => {

    const exito = login(user, contraseña);

    if (exito) {

      // 🔥 replace:true elimina el login del historial
      navigate("/profile", { replace: true });

    } else {
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "350px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <Input
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
        />

        <Button className="w-100" onClick={manejarLogin}>
          Iniciar Sesión
        </Button>

      </div>
    </div>
  );
}