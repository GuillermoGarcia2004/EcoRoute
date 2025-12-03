import { useState, useEffect } from "react"
import { AdminView } from "../layouts/AdminView"
import { ErrorMessage } from "../messages/ErrorMessage"
import { SuccessMessage } from "../messages/SuccessMessage"

export const GestionUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioEditado, setUsuarioEditado] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const verUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  }

  const editarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setUsuarioEditado(usuario);
    resetMessages();
    setModalEditar(true);
  }

  const guardarCambios = async (e) => {
    e.preventDefault();
    resetMessages();

    // Validar que todos los campos obligatorios estén llenos
    if (
      !usuarioEditado.nombre?.trim() ||
      !usuarioEditado.apellidos?.trim() ||
      !usuarioEditado.email?.trim() ||
      !usuarioEditado.rol?.trim() ||
      !usuarioEditado.estado?.trim()
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/v1/ecoroute/usuarios/${usuarioEditado.id_usuario}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuarioEditado)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar usuario');
      }

      await response.json();
      setSuccess("Usuario actualizado correctamente");
      setUsuarios(usuarios.map(u => u.id_usuario === usuarioEditado.id_usuario ? usuarioEditado : u));

      setTimeout(() => {
        cerrarModalEditar();
      }, 2000);

    } catch (error) {
      setError("Error al actualizar el usuario. Inténtalo de nuevo.");
      console.log('Error:', error);
    }
  };

  const cerrarModal = () => {
    setUsuarioSeleccionado(null);
    setMostrarModal(false);
  };

  const cerrarModalEditar = () => {
    setUsuarioSeleccionado(null);
    setUsuarioEditado({});
    setModalEditar(false);
    resetMessages();
  };

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/ecoroute/usuarios/');
        if(!response.ok) {
          throw new Error("Error al obtener los datos de los usuarios");
        }
        const datos = await response.json();
        setUsuarios(datos.users);
      } catch(error) {
        console.log(error);
      }
    };
    obtenerUsuarios();
  }, []);

  return (
    <AdminView>
      <h1 className="mb-5 text-white text-2xl">Listado de usuarios:</h1>
      <div className="w-[80%] h-[500px] p-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {usuarios.map(usuario => (
          usuario.rol !== "Administrador" ? (
            <div key={usuario.id_usuario} className="bg-white border rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)]">
              <img src={`src/assets/icons/${usuario.perfil}`} className="w-16 h-16 rounded-lg mb-2" />
              <h3 className="font-semibold">Nombre: {usuario.nombre} {usuario.apellidos}</h3>
              <p className="text-sm text-gray-500">Email: {usuario.email}</p>
              <p className="text-xs text-indigo-600">Rol: {usuario.rol}</p>
              <p className="text-[15px] font-bold">Estado del usuario: {usuario.estado}</p>
              <div className="flex gap-2 mt-2">
                <button className="px-2 py-1 border rounded cursor-pointer" onClick={() => verUsuario(usuario)}>Ver</button>
                <button className="px-2 py-1 bg-indigo-600 text-white rounded cursor-pointer" onClick={() => editarUsuario(usuario)}>Editar</button>
              </div>
            </div>
          ) : (
            <div key={usuario.id_usuario} className="bg-white rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)] border-4 border-solid border-[#47863c]">
              <img src={`src/assets/icons/${usuario.perfil}`} className="w-16 h-16 rounded-lg mb-2" />
              <h3 className="font-semibold">Nombre: {usuario.nombre} {usuario.apellidos}</h3>
              <p className="text-sm text-gray-500">Email: {usuario.email}</p>
              <p className="text-xs text-indigo-600">Rol: {usuario.rol}</p>
              <p className="text-[15px] font-bold">Estado del usuario: {usuario.estado}</p>
              <div className="flex gap-2 mt-2">
                <button className="px-2 py-1 border rounded cursor-pointer" onClick={() => verUsuario(usuario)}>Ver</button>
              </div>
            </div>
          )
        ))}
      </div>

      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Detalles del usuario</h2>
            <img src={`src/assets/icons/${usuarioSeleccionado.perfil}`} alt="Perfil" className="w-20 h-20 rounded-full mx-auto mb-4" />
            <p><span className="font-semibold">ID:</span> {usuarioSeleccionado.id_usuario}</p>
            <p><span className="font-semibold">Nombre:</span> {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellidos}</p>
            <p><span className="font-semibold">Puntos del usuario:</span> {usuarioSeleccionado.puntos}</p>
            <p><span className="font-semibold">Email:</span> {usuarioSeleccionado.email}</p>
            <p><span className="font-semibold">Teléfono:</span> {usuarioSeleccionado.telefono}</p>
            <p><span className="font-semibold">Rol:</span> {usuarioSeleccionado.rol}</p>
            <p><span className="font-semibold">Estado:</span> {usuarioSeleccionado.estado}</p>
            <button onClick={cerrarModal} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full cursor-pointer">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {modalEditar && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">Editar usuario</h2>
            <img src={`src/assets/icons/${usuarioSeleccionado.perfil}`} alt="Perfil" className="w-20 h-20 rounded-full mx-auto mb-4" />
            
            {error && <ErrorMessage message={error} />}
            {success && <SuccessMessage message={success} />}
            
            <form onSubmit={guardarCambios} className="space-y-3">
              <div>
                <label className="block font-semibold mb-1">Nombre</label>
                <input 
                  type="text" 
                  value={usuarioEditado.nombre || ''} 
                  onChange={(e) => setUsuarioEditado({ ...usuarioEditado, nombre: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Apellidos</label>
                <input 
                  type="text" 
                  value={usuarioEditado.apellidos || ''} 
                  onChange={(e) => setUsuarioEditado({ ...usuarioEditado, apellidos: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input 
                  type="email" 
                  value={usuarioEditado.email || ''} 
                  onChange={(e) => setUsuarioEditado({ ...usuarioEditado, email: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Teléfono</label>
                <input 
                  type="text" 
                  value={usuarioEditado.telefono || ''} 
                  onChange={(e) => setUsuarioEditado({ ...usuarioEditado, telefono: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" 
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Rol</label>
                <select 
                  value={usuarioEditado.rol || ''} 
                  onChange={(e) => setUsuarioEditado({ ...usuarioEditado, rol: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Seleccionar rol</option>
                  <option value="Usuario">Usuario</option>
                  <option value="Administrador">Administrador</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Estado</label>
                <select 
                  value={usuarioEditado.estado || ''} 
                  onChange={(e) => setUsuarioEditado({ ...usuarioEditado, estado: e.target.value })}
                  className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">Seleccionar estado</option>
                  <option value="Activo">Activo</option>
                  <option value="Inactivo">Inactivo</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="submit" 
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors font-medium cursor-pointer"
                >
                  Guardar cambios
                </button>
                <button 
                  type="button" 
                  onClick={cerrarModalEditar} 
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors font-medium cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminView>
  )
}