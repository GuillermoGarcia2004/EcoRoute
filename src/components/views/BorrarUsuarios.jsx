import { useState, useEffect } from "react"
import { AdminView } from "../layouts/AdminView"
export const BorrarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  // Abrir modal y establecer usuario seleccionado
  const preguntarBorrarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setMostrarModal(true);
  }
  // Confirmar borrado y hacer llamada DELETE a API
  const confirmarBorrado = async () => {
    if (!usuarioSeleccionado) return;
    try {
      const response = await fetch(`http://localhost:3000/api/v1/ecoroute/usuarios/${usuarioSeleccionado.id_usuario}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error("Error al borrar usuario");
      // Eliminar usuario de lista localmente tras borrado exitoso
      setUsuarios(usuarios.filter(u => u.id_usuario !== usuarioSeleccionado.id_usuario));
      cerrarModal();
    } catch (error) {
      console.log(error);
    }
  }
  const cerrarModal = () => {
    setUsuarioSeleccionado(null);
    setMostrarModal(false);
  };
  const formatearFecha = (fecha) => {
    const iso = fecha;
    const d = new Date(iso);
    // Día/Mes/Año Hora:Minuto (con cero a la izquierda)
    const dia   = String(d.getDate()).padStart(2, "0");
    const mes   = String(d.getMonth() + 1).padStart(2, "0");
    const año   = d.getFullYear();
    const hora  = String(d.getHours()).padStart(2, "0");
    const min   = String(d.getMinutes()).padStart(2, "0");
    const formateada = `${dia}/${mes}/${año} ${hora}:${min}`;
    return formateada;
  }
  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/ecoroute/usuarios/delete/');
        if(!response.ok) throw new Error("Error al obtener los datos de los usuarios");
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
      <h1 className="mb-5 text-white text-2xl">Peticiones de eliminación de usuarios pendientes:</h1>
      <div className="w-[80%] h-[500px] p-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {usuarios.map(usuario => (
          <div key={usuario.id_usuario} className="bg-white border rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)]">
            <img src={`src/assets/icons/${usuario.perfil}`} className="w-16 h-16 rounded-lg mb-2" />
            <h3 className="font-semibold">Nombre: {usuario.nombre} {usuario.apellidos}</h3>
            <p className="text-sm text-gray-500">Email: {usuario.email}</p>
            <p className="text-xs text-indigo-600">Rol: {usuario.rol}</p>
            <p className="text-[15px] font-bold">Estado del usuario: {usuario.estado}</p>
            {usuario.fecha_solicitud_baja ? (
              <p className="text-[15px] font-bold">Fecha de solicitud de baja: {formatearFecha(usuario.fecha_solicitud_baja)}</p>
            ): (
              <p className="text-[15px] font-bold">Fecha de solicitud de baja: No indicada</p>
            )}
            <div className="flex gap-2 mt-2">
              <button className="px-2 py-1 border rounded cursor-pointer" onClick={() => preguntarBorrarUsuario(usuario)}>
                Borrar
              </button>
            </div>
          </div>
        ))}
      </div>
      {mostrarModal && usuarioSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg relative">
            <p>¿Desea borrar el usuario que ha seleccionado?</p>
            <div className="flex items-center justify-center gap-x-4">
              <button onClick={confirmarBorrado} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full cursor-pointer">
                Confirmar
              </button>
              <button onClick={cerrarModal} className="mt-4 bg-red-600 text-white px-4 py-2 rounded w-full cursor-pointer">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminView>
  )
}