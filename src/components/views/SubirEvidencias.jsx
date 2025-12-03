import { useState, useEffect } from "react";
import { UserView } from "../layouts/UserView";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";

export const SubirEvidencias = () => {
  const obtenerIdUsuario = () => {
    const id = localStorage.getItem("idSesion");
    return id ? Number(id) : null;
  };

  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [contadorEvidenciasHoy, setContadorEvidenciasHoy] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Nuevo estado loading

  const [formDataCrear, setFormDataCrear] = useState({
    id_usuario: obtenerIdUsuario(),
    tipo: "",
    contenido: "",
    puntos: 0,
  });

  const tiposEvidencia = {
    URL_FACEBOOK: 15,
    URL_INSTAGRAM: 30,
    URL_YOUTUBE: 45,
    URL_X: 60,
  };

  const prefijosURL = {
    URL_FACEBOOK: "https://www.facebook.com/",
    URL_INSTAGRAM: "https://www.instagram.com/",
    URL_YOUTUBE: "https://www.youtube.com/@",
    URL_X: "https://www.twitter.com/",
  };

  // Consulta cuántas evidencias ha subido el usuario hoy - CORREGIDO
  const consultarContadorEvidencias = async () => {
    const fechaHoy = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/ecoroute/evidencias/count?usuario=${obtenerIdUsuario()}&fecha=${fechaHoy}`
      );
      
      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      
      const data = await res.json();
      // Acceso correcto a la estructura anidada de la API
      setContadorEvidenciasHoy(data.resultado?.numero_evidencias || 0);
    } catch (error) {
      console.error("Error consultando contador:", error);
      setContadorEvidenciasHoy(0); // En caso de error, permitir subir
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    consultarContadorEvidencias();
  }, []);

  const handleInputChangeCrear = (e) => {
    const { name, value } = e.target;

    // Si cambia el tipo de evidencia
    if (name === "tipo") {
      const puntosAsignados = tiposEvidencia[value] || 0;
      setPuntos(puntosAsignados);

      setFormDataCrear({
        id_usuario: obtenerIdUsuario(),
        tipo: value,
        contenido: "",
        puntos: puntosAsignados,
      });

      if (mostrarError) setMostrarError(false);
      return;
    }

    // Entrada del usuario (parte editable)
    if (name === "contenido_usuario") {
      const url = prefijosURL[formDataCrear.tipo] + value;

      setFormDataCrear((prev) => ({
        ...prev,
        contenido: url,
        puntos: puntos, // puntos asignados ya establecidos
      }));

      if (mostrarError) setMostrarError(false);
    }
  };

  const handleCrearEvidencia = async () => {
    if (!formDataCrear.tipo || !formDataCrear.contenido) {
      setMensajeError("Debes seleccionar un tipo y escribir la URL.");
      setMostrarError(true);
      return;
    }

    // Validación del límite (≥4 evidencias bloquea subida)
    if (contadorEvidenciasHoy >= 4) {
      setMensajeError("Has alcanzado el límite de 4 evidencias para hoy.");
      setMostrarError(true);
      return;
    }

    setMostrarError(false);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/ecoroute/evidencias/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataCrear),
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      await response.json();

      // MEJORA: Reconsultar contador real en lugar de incrementar manualmente
      await consultarContadorEvidencias();

      // Recargar datos del usuario
      const userRes = await fetch(
        `http://localhost:3000/api/v1/ecoroute/usuarios/${obtenerIdUsuario()}`
      );
      const userData = await userRes.json();

      window.dispatchEvent(
        new CustomEvent("evidenciaSubida", {
          detail: { user: userData.user },
        })
      );

      setMensajeExito(
        `Evidencia creada correctamente. Se asignaron ${formDataCrear.puntos} puntos.`
      );
      setMostrarExito(true);

      setTimeout(() => setMostrarExito(false), 2000);

      // Resetear formulario
      setFormDataCrear({
        id_usuario: obtenerIdUsuario(),
        tipo: "",
        contenido: "",
        puntos: 0,
      });
      setPuntos(0);
    } catch (error) {
      setMensajeError(error.message || "Error al crear la evidencia");
      setMostrarError(true);
    }
  };

  // Mostrar loading mientras consulta el contador
  if (isLoading) {
    return (
      <UserView>
        <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
          <h2 className="font-bold text-xl mb-6 text-gray-800">
            Crear Nueva Evidencia
          </h2>
          <div className="text-center py-8">
            <p className="text-gray-500">Cargando contador de evidencias...</p>
          </div>
        </div>
      </UserView>
    );
  }

  return (
    <UserView>
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="font-bold text-xl mb-6 text-gray-800">
          Crear Nueva Evidencia
        </h2>

        {/* Mostrar contador actual */}
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            Evidencias hoy: <strong>{contadorEvidenciasHoy}</strong>/4
          </p>
        </div>

        {mostrarError && <ErrorMessage message={mensajeError} />}
        {mostrarExito && <SuccessMessage message={mensajeExito} />}

        <div className="space-y-4 mb-6">
          {/* ID usuario */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID del Usuario
            </label>
            <input
              type="text"
              value={obtenerIdUsuario() || "No disponible"}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-sm text-gray-600 cursor-not-allowed"
            />
          </div>

          {/* Tipo evidencia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Evidencia *
            </label>
            <select
              name="tipo"
              value={formDataCrear.tipo}
              onChange={handleInputChangeCrear}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={contadorEvidenciasHoy >= 4}
            >
              <option value="">Seleccionar tipo</option>
              <option value="URL_FACEBOOK">URL de Facebook</option>
              <option value="URL_INSTAGRAM">URL de Instagram</option>
              <option value="URL_YOUTUBE">URL de Youtube</option>
              <option value="URL_X">URL de X</option>
            </select>
          </div>

          {/* URL + puntos */}
          {formDataCrear.tipo && (
            <>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL de la evidencia *
              </label>

              <div className="flex w-full items-center border border-gray-300 rounded-lg overflow-hidden">
                <span className="bg-gray-100 text-gray-600 px-3 py-3 text-sm whitespace-nowrap">
                  {prefijosURL[formDataCrear.tipo]}
                </span>

                <input
                  type="text"
                  name="contenido_usuario"
                  onChange={handleInputChangeCrear}
                  className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="nombre_de_usuario"
                  disabled={contadorEvidenciasHoy >= 4}
                />
              </div>

              <div className="text-sm text-gray-600 mt-2">
                URL generada:
                <strong className="block break-words text-gray-800">
                  {formDataCrear.contenido || "(pendiente)"}
                </strong>
              </div>

              <div className="text-sm text-gray-600 mt-2">
                Puntos asignados: <strong>{formDataCrear.puntos}</strong>
              </div>
            </>
          )}

          {contadorEvidenciasHoy >= 4 ? (
            <p className="w-full text-center text-red-600 font-semibold py-3 rounded-lg border-2 border-red-200 bg-red-50">
              🔒 Límite alcanzado: {contadorEvidenciasHoy} evidencias hoy
            </p>
          ) : (
            <button
              onClick={handleCrearEvidencia}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={contadorEvidenciasHoy >= 4}
            >
              Crear Evidencia ({contadorEvidenciasHoy}/4)
            </button>
          )}
        </div>
      </div>
    </UserView>
  );
};
