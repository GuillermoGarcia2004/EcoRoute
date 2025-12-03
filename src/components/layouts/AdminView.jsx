import { useState, useEffect } from "react"
import { AdminSideBar } from "./AdminSideBar";

export const AdminView = ({ children }) => {
  const [usuario, setUsuario] = useState([]);
  // Función para cerrar la sesión del usuario
  const cerrarSesion = e => {
    e.preventDefault();
    localStorage.removeItem("idSesion"); // Elimina del localStorage el ID de sesión
    localStorage.removeItem("rolUsuario"); // Elimina del localStorage el rol del usuario
    window.location.href = "/"; // Te redirige a la página principal
  }
  // Utilizo el useEffect para obtener los datos del usuario
  useEffect(() => {
    const obtenerDatosDelUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/ecoroute/usuarios/${localStorage.getItem("idSesion")}`);
        if(!response.ok) {
          throw new Error("Error al obtener los datos del usuario");
        }
        const datos = await response.json();
        setUsuario(datos.user);
      } catch(error) {
        console.log(error);
      }
    };
    obtenerDatosDelUsuario();
  }, []);
  return (
    <div className="bg-[#191C27] min-h-screen font-[Cabin,sans-serif]">
      <div className="flex">
        <AdminSideBar usuario={usuario} cerrarSesion={cerrarSesion} />
        <div className="flex-1 flex items-center justify-center flex-col">
          { children }
        </div>
      </div>
    </div>
  )
}