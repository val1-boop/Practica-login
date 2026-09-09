export default function CampoTexto({ tipo, valor, alCambiar, placeholder }) {
  return (
    <input
      type={tipo}
      value={valor}
      onChange={alCambiar}
      placeholder={placeholder}
      className="campo-texto"
    />
  );
}