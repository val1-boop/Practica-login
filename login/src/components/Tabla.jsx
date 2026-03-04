export default function Tabla({ listaUsuarios }) {

  return (
    <table className="table table-bordered mt-4">

      <thead className="table-dark">
        <tr>
          <th>Usuario</th>
          <th>Nombre Completo</th>
          <th>Rol</th>
        </tr>
      </thead>

      <tbody>
        {/* Usamos .map para recorrer el arreglo */}
        {listaUsuarios.map((u, index) => (
          <tr key={index}>
            <td>{u.user}</td>
            <td>{u.nombreCompleto}</td>
            <td>{u.rol}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}