import { useState, useEffect } from "react";
import { UserView } from "../layouts/UserView";

export const RecompensasCanjeadas = () => {
  const [recompensas, setRecompensas] = useState([]);
  const obtenerIdUsuario = () => {
    const id = localStorage.getItem("idSesion");
    return id ? Number(id) : null;
  };
  const listarRecompensas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/ecoroute/recompensas/canjeadas/${obtenerIdUsuario()}`);
      if (!response.ok) {
        throw new Error("Error al obtener las recompensas");
      }
      const datos = await response.json();
      setRecompensas(datos.recompensas || []);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  useEffect(() => {
    listarRecompensas();
  }, []);
  return (
    <UserView>
      <div className="mb-5">
        <h1 className="text-white text-2xl">Recompensas canjeadas:</h1>
      </div>
      {recompensas.length === 0 ? (
        <div className="text-white text-lg text-center mt-10">El usuario todavía no ha canjeado recompensas.</div>
      ) : (
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
                </div>
              </div>
              <div className="text-center w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md cursor-pointer">{r.codigo}</div>
            </div>
          ))}
        </div>
      )}
    </UserView>
  );
};