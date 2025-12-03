import { useState, useEffect } from "react";
import { UserView } from "../layouts/UserView";
export const EliminarCuenta = () => {
  const [pendienteBaja, setPendienteBaja] = useState(null);
  useEffect(() => {
    const verificarBaja = async () => {
      const idSesion = localStorage.getItem("idSesion");
      if (!idSesion) {
        setPendienteBaja(false);
        return;
      }
      try {
        const response = await fetch(
          `http://localhost:3000/api/v1/ecoroute/usuarios/pendiente_baja/${idSesion}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPendienteBaja(data.pendiente);
        } else {
          setPendienteBaja(false);
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error);
        setPendienteBaja(false);
      }
    };
    verificarBaja();
  }, []);
  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (pendienteBaja) return; // No hacer nada si ya está pendiente
    const idSesion = localStorage.getItem("idSesion");
    if (!idSesion) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/ecoroute/usuarios/pendiente_baja/${idSesion}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: idSesion }),
        }
      );
      if (response.ok) {
        setPendienteBaja(true); // Actualizar estado para bloquear botón y mostrar aviso
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  if (pendienteBaja === null) {
    return (
      <UserView>
        <div>Cargando...</div>
      </UserView>
    );
  }
  return (
    <UserView>
      {pendienteBaja ? (
        <div className="h-[300px] w-[500px] bg-yellow-200 rounded-xl p-5 border-2 border-solid border-yellow-600 flex items-center justify-center">
          <h2 className="text-center text-xl font-semibold text-yellow-800">Su solicitud de baja está pendiente de aprobación.</h2>
        </div>
      ) : (
        <div className="h-[300px] w-[500px] bg-white rounded-xl p-5 border-2 border-solid border-[#47863c]">
          <h1 className="text-center text-2xl text-indigo-600 font-bold mb-5">Eliminar cuenta</h1>
          <p className="text-[17px] font-medium text-green-600">
            Desde este panel puede manadar una solicitud al usuario administrador
            para eliminar su cuenta. Tenga en cuenta que una vez acepte, en un
            periodo de dos o tres días será efectiva la eliminación de su cuenta.
            Este acto será permanente e irreversible. Gracias por su atención.
          </p>
          <div className="mt-5">
            <button
              onClick={handleDeleteAccount}
              disabled={pendienteBaja}
              className={`text-white p-2 rounded-xl w-full cursor-pointer transition-colors ${
                pendienteBaja
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              Borrar cuenta
            </button>
          </div>
        </div>
      )}
    </UserView>
  );
};