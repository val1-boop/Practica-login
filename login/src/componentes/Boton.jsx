export default function Boton({ texto, accion }) {
  return (
    <button onClick={accion} className="boton-principal">
      {texto}
    </button>
  );
}