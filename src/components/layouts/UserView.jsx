import { useState, useEffect } from "react"
import { UserSideBar } from "./UserSideBar";

export const UserView = ({ children }) => {
  const [usuario, setUsuario] = useState([]);
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
  const cerrarSesion = e => {
    e.preventDefault();
    localStorage.removeItem("idSesion"); // Elimina del localStorage el ID de sesión
    localStorage.removeItem("rolUsuario"); // Elimina del localStorage el rol del usuario
    window.location.href = "/"; // Te redirige a la página principal
  }
  // Escuchar evento de evidencia subida
  useEffect(() => {
    const handleEvidenciaSubida = (event) => {
      setUsuario(event.detail.user);
    };
    window.addEventListener('evidenciaSubida', handleEvidenciaSubida);
    return () => {
      window.removeEventListener('evidenciaSubida', handleEvidenciaSubida);
    };
  }, []);
   // Escuchar evento de recompensa comprada
  useEffect(() => {
    const handleRecompensaComprada = (event) => {
      setUsuario(event.detail.user);
    };
    window.addEventListener('recompensaComprada', handleRecompensaComprada);
    return () => {
      window.removeEventListener('recompensaComprada', handleRecompensaComprada);
    };
  }, []);
  // useEffect original para carga inicial
  useEffect(() => {
    obtenerDatosDelUsuario();
  }, []);
 return (
    <div className="bg-[#191C27] min-h-screen font-[Cabin,sans-serif]">
      <div className="flex">
        <UserSideBar usuario={usuario} cerrarSesion={cerrarSesion} />
        <div className="flex-1 flex items-center justify-center flex-col">
          { children }
        </div>
      </div>
    </div>
  )
};