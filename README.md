# Autenticación con Roles en React

Sistema de inicio de sesión con control de acceso por rol, rutas protegidas y sesión persistente, construido con React y React Router.

Proyecto de práctica desarrollado para la materia de Desarrollo Web — Universidad Tecnológica Emiliano Zapata (UTEZ).

## Qué hace

- Inicio de sesión validado contra un catálogo de usuarios
- **Sesión persistente**: se guarda en `localStorage`, así que no se pierde al recargar la página
- **Rutas protegidas**: quien no tenga sesión es redirigido al login automáticamente
- **Rutas públicas inversas**: quien ya inició sesión no puede volver al login; se le manda a su vista según su rol
- **Control por rol**: la vista de administración solo es accesible para usuarios con rol `admin`
- Cierre de sesión que limpia el estado global y el almacenamiento del navegador

## Rutas

| Ruta | Acceso | Vista |
|---|---|---|
| `/login` | pública (redirige si ya hay sesión) | Formulario de acceso |
| `/` | requiere sesión | Perfil |
| `/perfil` | requiere sesión | Perfil del usuario |
| `/admin` | requiere sesión **y** rol `admin` | Panel con la tabla de usuarios |

Un usuario con rol `user` que intente entrar a `/admin` es redirigido a `/perfil`. Un visitante sin sesión que intente cualquier ruta protegida va a `/login`.

## Cómo funciona la autenticación

El estado de sesión vive en un **Context** de React, no en cada componente:

```
src/context/ContextoAuth.jsx
├── AuthProvider      # Envuelve la app y expone la sesión
├── iniciarSesion()   # Valida credenciales y persiste en localStorage
├── cerrarSesion()    # Limpia estado y almacenamiento
└── usarAuth()        # Hook personalizado para consumir el contexto
```

Cualquier componente accede a la sesión con una sola línea:

```jsx
const { usuarioActual, cerrarSesion } = usarAuth();
```

La protección de rutas se resuelve con dos componentes envolventes que deciden antes de renderizar:

- `RutaProtegida` — verifica sesión y, opcionalmente, un rol requerido
- `RutaPublica` — impide que un usuario autenticado regrese al login

## Estructura

```
src/
├── componentes/
│   ├── Boton.jsx           # Botón reutilizable
│   ├── CampoTexto.jsx      # Input reutilizable
│   ├── TablaUsuarios.jsx   # Tabla del panel de administración
│   ├── RutaProtegida.jsx   # Guarda de sesión y rol
│   └── RutaPublica.jsx     # Guarda inversa
├── context/
│   └── ContextoAuth.jsx    # Estado global de autenticación
├── data/
│   └── Usuarios.js         # Catálogo de usuarios (simula la base de datos)
├── paginas/
│   ├── Login.jsx
│   ├── Perfil.jsx
│   └── Admin.jsx
└── App.jsx                 # Definición de rutas
```

## Tecnologías

React · Vite · React Router · Context API · Hooks (`useState`, `useEffect`, `useContext`)

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Queda disponible en `http://localhost:5173`.

### Credenciales de prueba

Los usuarios están definidos en `src/data/Usuarios.js`. Todos usan la contraseña `1234`:

| Usuario | Rol |
|---|---|
| `zero` | admin |
| `val` | user |

Entra con `zero` para ver el panel de administración, o con `val` para comprobar que el acceso a `/admin` queda bloqueado.

## Estado actual y siguientes pasos

Es un proyecto de práctica enfocado en el control de acceso del lado del cliente. Lo que faltaría para llevarlo más lejos:

- **Los usuarios están en un archivo JavaScript**, no en una base de datos. `Usuarios.js` simula el backend; conectarlo a una API real sería el siguiente paso.
- **Las contraseñas están en texto plano.** En una implementación real la validación ocurre en el servidor, contra contraseñas cifradas, y el cliente solo recibe un token.
- **La protección es solo de interfaz.** Las rutas protegidas evitan que se muestre la vista, pero no sustituyen la validación en el servidor: cualquier control de acceso real tiene que vivir en el backend.
- No hay registro de nuevos usuarios ni recuperación de contraseña.
