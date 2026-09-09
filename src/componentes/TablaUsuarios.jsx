export default function TablaUsuarios({ listaUsuarios }) {

  return (
    <table className="tabla-usuarios">

      <thead>
        <tr>
          <th>Usuario</th>
          <th>Nombre Completo</th>
          <th>Rol</th>
        </tr>
      </thead>

      <tbody>
        {listaUsuarios.map((usuario, index) => (
          <tr key={index}>
            <td>{usuario.user}</td>
            <td>{usuario.nombreCompleto}</td>
            <td>{usuario.rol}</td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}