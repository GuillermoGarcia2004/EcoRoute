import { useState, useEffect } from "react";
import { UserView } from "../layouts/UserView";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";
export const ComprarRecompensas = () => {
  const [recompensas, setRecompensas] = useState([]);
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const obtenerIdUsuario = () => {
    const id = localStorage.getItem("idSesion");
    return id ? Number(id) : null;
  };
  const listarRecompensas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/recompensas/");
      if (!response.ok) {
        throw new Error("Error al obtener las recompensas");
      }
      const datos = await response.json();
      setRecompensas(datos.recompensas || datos || []);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  const comprarRecompensa = async (recompensa) => {
    const id_usuario = obtenerIdUsuario();
    if (!id_usuario) {
      alert("No hay usuario en sesión");
      return;
    }
    const payload = {
      id_usuario,
      id_recompensa: Number(recompensa.id),
      valor: Number(recompensa.valor),
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/ecoroute/recompensas/comprar",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (!response.ok || data.error) {
        setMensajeError(data.error || "Error al comprar la recompensa");
        setMostrarError(true);
        setTimeout(() => {
          setMensajeError("");
          setMostrarError(false);
        }, 2000);
        return; 
      }
      // Recargar datos del usuario desde la API para obtener puntos actualizados
      const userResponse = await fetch(`http://localhost:3000/api/v1/ecoroute/usuarios/${obtenerIdUsuario()}`);
      const userData = await userResponse.json();
      // Usar event personalizado para notificar a UserView
      window.dispatchEvent(new CustomEvent('recompensaComprada', { 
        detail: { user: userData.user } 
      }));
      setMensajeExito(data.mensaje || "Compra exitosa");
      setMostrarExito(true);
      setTimeout(() => {
        setMensajeExito("");
        setMostrarExito(false);
      }, 2000);
    } catch (error) {
      console.log("Error:", error);
      setMensajeError("Error de conexión o del servidor");
      setMostrarError(true);
      setTimeout(() => {
        setMensajeError("");
        setMostrarError(false);
      }, 2000);
    }
  };
  useEffect(() => {
    listarRecompensas();
  }, []);
  return (
    <UserView>
      <div className="mb-5">
        <h1 className="text-white text-2xl">Comprar recompensas:</h1>
        {mostrarExito && (
          <SuccessMessage message={mensajeExito} onClose={() => setMostrarExito(false)} />
        )}
        {mostrarError && (
          <ErrorMessage message={mensajeError} onClose={() => setMostrarError(false)} />
        )}
      </div>
      <div className="w-[80%] h-[500px] p-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {recompensas.map((r) => (
          <div key={r.id} className="bg-white border rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)] h-[220px] flex flex-col justify-between">
            <div className="flex items-center justify-center gap-x-5 mb-4">
              <div className="h-[80px] w-[80px] border-4 border-solid border-[green] bg-black p-4 rounded-full flex items-center justify-center">
                <img src="/src/assets/img/regalo.png" alt={`Logo regalo ${r.id}`} className="w-full h-full object-contain" />
              </div>
              <div className="w-[70%] border-2 border-solid border-black rounded-xl p-3 flex-1">
                <p className="font-medium text-gray-700 text-sm mb-1">Nombre: {r.nombre}</p>
                <p className="text-xs mb-1">Descripción: {r.descripcion}</p>
                <p className="font-bold text-green-600 text-sm">Valor: {r.valor} puntos</p>
              </div>
            </div>
            <button onClick={() => comprarRecompensa(r)} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md cursor-pointer">COMPRAR</button>
          </div>
        ))}
      </div>
    </UserView>
  );
};