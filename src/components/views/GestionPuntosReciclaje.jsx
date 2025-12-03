import { useState, useEffect } from "react";
import { AdminView } from "../layouts/AdminView";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";
export const GestionPuntosReciclaje = () => {
  const [puntos, setPuntos] = useState([]);
  const [puntoParaVer, setPuntoParaVer] = useState(null);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [puntoParaEliminar, setPuntoParaEliminar] = useState(null);
  const [eliminando, setEliminando] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [puntoParaEditar, setPuntoParaEditar] = useState(null);
  const [editando, setEditando] = useState(false);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [creando, setCreando] = useState(false);
  const [formDataCrear, setFormDataCrear] = useState({
    nombre: "",
    descripcion: "",
    direccion_usuario: "",
    direccion_administrador: "",
  });
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    direccion_usuario: "",
    direccion_administrador: "",
  });
  const obtenerIdUsuario = () => {
    return localStorage.getItem("idSesion");
  };
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  };
  const validarFormulario = (formDataValidar) => {
    return (
      formDataValidar.nombre.trim() !== "" &&
      formDataValidar.descripcion.trim() !== "" &&
      formDataValidar.direccion_usuario.trim() !== "" &&
      formDataValidar.direccion_administrador.trim() !== ""
    );
  };

  const handleInputChangeCrear = (e) => {
    const { name, value } = e.target;
    setFormDataCrear((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (mostrarError) {
      setMostrarError(false);
    }
  };

  const crearPunto = async () => {
    if (!validarFormulario(formDataCrear)) {
      setMostrarError(true);
      setMensajeError("Todos los campos son obligatorios");
      return;
    }

    const idUsuario = obtenerIdUsuario();
    if (!idUsuario) {
      setMostrarError(true);
      setMensajeError("No se encontró la sesión del usuario");
      return;
    }

    setCreando(true);
    setMostrarError(false);

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            creador: parseInt(idUsuario),
            nombre: formDataCrear.nombre,
            descripcion: formDataCrear.descripcion,
            direccion_usuario: formDataCrear.direccion_usuario,
            direccion_administrador: formDataCrear.direccion_administrador,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear");
      }

      const responseData = await response.json();
      setMostrarExito(true);
      setMensajeExito(
        responseData.mensaje || "Punto de reciclaje creado correctamente"
      );

      setTimeout(() => {
        cerrarModalCrear();
        setMostrarExito(false);
        obtenerPuntosReciclaje();
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMostrarError(true);
      setMensajeError(error.message || "Error al crear el punto de reciclaje");
    } finally {
      setCreando(false);
    }
  };

  const abrirModalCrear = () => {
    setFormDataCrear({
      nombre: "",
      descripcion: "",
      direccion_usuario: "",
      direccion_administrador: "",
    });
    setMostrarError(false);
    setMostrarExito(false);
    setMostrarModalCrear(true);
  };

  const cerrarModalCrear = () => {
    setFormDataCrear({
      nombre: "",
      descripcion: "",
      direccion_usuario: "",
      direccion_administrador: "",
    });
    setMostrarError(false);
    setMostrarExito(false);
    setMostrarModalCrear(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (mostrarError) {
      setMostrarError(false);
    }
  };

  const editarPunto = async () => {
    if (!validarFormulario(formData)) {
      setMostrarError(true);
      setMensajeError("Todos los campos son obligatorios");
      return;
    }

    setEditando(true);
    setMostrarError(false);

    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/${puntoParaEditar.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombre: formData.nombre,
            descripcion: formData.descripcion,
            direccion_usuario: formData.direccion_usuario,
            direccion_administrador: formData.direccion_administrador,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al editar");
      }

      const responseData = await response.json();

      setPuntos(
        puntos.map((p) =>
          p.id === puntoParaEditar.id
            ? {
                ...p,
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                direccion_usuario: formData.direccion_usuario,
                direccion_administrador: formData.direccion_administrador,
              }
            : p
        )
      );

      setMostrarExito(true);
      setMensajeExito("Punto de reciclaje actualizado correctamente");
      setTimeout(() => {
        cerrarModalEditar();
        setMostrarExito(false);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setMostrarError(true);
      setMensajeError(error.message || "Error al editar el punto de reciclaje");
    } finally {
      setEditando(false);
    }
  };

  const abrirModalEditar = (punto) => {
    setPuntoParaEditar(punto);
    setFormData({
      nombre: punto.nombre || "",
      descripcion: punto.descripcion || "",
      direccion_usuario: punto.direccion_usuario || "",
      direccion_administrador: punto.direccion_administrador || "",
    });
    setMostrarError(false);
    setMostrarExito(false);
    setMostrarModalEditar(true);
  };

  const cerrarModalEditar = () => {
    setPuntoParaEditar(null);
    setFormData({
      nombre: "",
      descripcion: "",
      direccion_usuario: "",
      direccion_administrador: "",
    });
    setMostrarError(false);
    setMostrarExito(false);
    setMostrarModalEditar(false);
  };

  const obtenerPuntosReciclaje = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/"
      );
      if (!response.ok)
        throw new Error("Error al obtener los puntos de reciclaje");
      const datos = await response.json();
      setPuntos(datos.recycles || datos || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const eliminarPunto = async (id) => {
    setEliminando(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al eliminar");
      }

      setPuntos(puntos.filter((p) => p.id !== id));
      cerrarModalEliminar();
    } catch (error) {
      console.log("Error:", error);
      setMostrarError(true);
      setMensajeError(
        error.message || "Error al eliminar el punto de reciclaje"
      );
    } finally {
      setEliminando(false);
    }
  };

  const abrirModalEliminar = (punto) => {
    setPuntoParaEliminar(punto);
    setMostrarModalEliminar(true);
  };

  const cerrarModalEliminar = () => {
    setPuntoParaEliminar(null);
    setMostrarModalEliminar(false);
  };

  useEffect(() => {
    obtenerPuntosReciclaje();
  }, []);

  const abrirModalVer = (punto) => {
    setPuntoParaVer(punto);
    setMostrarModalVer(true);
  };

  const cerrarModalVer = () => {
    setPuntoParaVer(null);
    setMostrarModalVer(false);
  };

  return (
    <AdminView>
      <div className="mb-5">
        <h1 className="text-white text-2xl">Listado de Puntos de Reciclaje:</h1>

        <button
          onClick={abrirModalCrear}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors shadow-lg cursor-pointer"
        >
          + Agregar Punto de Reciclaje
        </button>
      </div>

      <div className="w-[80%] h-[500px] p-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {puntos.map((punto) => (
          <div
            key={punto.id}
            className="bg-white border rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)]"
          >
            <h3 className="font-semibold text-lg mb-2">{punto.nombre}</h3>
            <p className="text-sm text-gray-600 mb-1">
              {punto.descripcion || "Sin descripción"}
            </p>
            <p className="text-xs text-indigo-600 mb-3 line-clamp-2">
              {punto.direccion_usuario || "Dirección no disponible"}
            </p>
            <p className="text-xs text-gray-500 mb-4">
              Creado: {formatearFecha(punto.fecha_creacion)}
            </p>

            <div className="flex gap-2">
              <button
                className="px-3 py-2 border rounded bg-green-500 text-white text-sm cursor-pointer flex-1 hover:bg-green-600 transition-colors"
                onClick={() => abrirModalEditar(punto)}
                title="Editar punto de reciclaje"
              >
                ✏️ Editar
              </button>
              <button
                className="px-4 py-2 border rounded bg-blue-500 text-white text-sm cursor-pointer flex-1 hover:bg-blue-600 transition-colors"
                onClick={() => abrirModalVer(punto)}
              >
                Ver
              </button>
              <button
                className="px-4 py-2 border rounded bg-red-500 text-white text-sm cursor-pointer hover:bg-red-600 transition-colors flex-shrink-0"
                onClick={() => abrirModalEliminar(punto)}
                title="Eliminar punto de reciclaje"
                disabled={eliminando}
              >
                🗑️ Borrar
              </button>
            </div>
          </div>
        ))}
      </div>

      {mostrarModalCrear && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="font-bold text-xl mb-6 text-gray-800">
              Crear Nuevo Punto de Reciclaje
            </h2>

            {mostrarError && <ErrorMessage message={mensajeError} />}

            {mostrarExito && <SuccessMessage message={mensajeExito} />}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formDataCrear.nombre}
                  onChange={handleInputChangeCrear}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Nombre del punto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  value={formDataCrear.descripcion}
                  onChange={handleInputChangeCrear}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-vertical"
                  placeholder="Descripción del punto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Usuario *
                </label>
                <input
                  type="text"
                  name="direccion_usuario"
                  value={formDataCrear.direccion_usuario}
                  onChange={handleInputChangeCrear}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Dirección completa usuario"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Administrador *
                </label>
                <input
                  type="text"
                  name="direccion_administrador"
                  value={formDataCrear.direccion_administrador}
                  onChange={handleInputChangeCrear}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Dirección para administrador"
                />
              </div>

              {/* MOSTRAR ID DEL CREADOR (NO EDITABLE) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Creador
                </label>
                <details className="cursor-pointer">
                  <summary>Ver más información</summary>
                  <p>
                    Este número es el ID de usuario del creador del evento, que
                    se corresponde con tu ID.
                  </p>
                </details>
                <input
                  type="text"
                  value={`${obtenerIdUsuario() || "No disponible"}`}
                  readOnly
                  className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg text-sm text-gray-600 cursor-not-allowed"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cerrarModalCrear}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium cursor-pointer"
                disabled={creando}
              >
                Cancelar
              </button>
              <button
                onClick={crearPunto}
                className="flex-1 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={creando}
              >
                {creando ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creando...
                  </>
                ) : (
                  "Crear Punto"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalEditar && puntoParaEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="font-bold text-xl mb-6 text-gray-800">
              Editar Punto de Reciclaje
            </h2>

            {mostrarError && (
              <ErrorMessage
                message={mensajeError || "Todos los campos son obligatorios"}
              />
            )}

            {mostrarExito && (
              <SuccessMessage
                message={
                  mensajeExito || "Punto de reciclaje actualizado correctamente"
                }
              />
            )}

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del punto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción *
                </label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Descripción del punto"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Usuario *
                </label>
                <input
                  type="text"
                  name="direccion_usuario"
                  value={formData.direccion_usuario}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dirección completa usuario"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Administrador *
                </label>
                <input
                  type="text"
                  name="direccion_administrador"
                  value={formData.direccion_administrador}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Dirección para administrador"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cerrarModalEditar}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium cursor-pointer"
                disabled={editando}
              >
                Cancelar
              </button>
              <button
                onClick={editarPunto}
                className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={editando}
              >
                {editando ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Guardando...
                  </>
                ) : (
                  "Guardar Cambios"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalVer && puntoParaVer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="font-bold text-xl mb-6 text-gray-800">
              {puntoParaVer.nombre}
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-gray-700 block mb-1">ID:</strong>
                <span className="bg-gray-100 px-3 py-1 rounded-full text-xs">
                  {puntoParaVer.id}
                </span>
              </div>
              <div>
                <strong className="text-gray-700">Descripción:</strong>
                <p className="mt-1 text-gray-600">{puntoParaVer.descripcion}</p>
              </div>
              <div>
                <strong className="text-gray-700">Dirección Usuario:</strong>
                <p className="mt-1 text-gray-600 break-words">
                  {puntoParaVer.direccion_usuario}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">Dirección Admin:</strong>
                <p className="mt-1 text-gray-600 break-words">
                  {puntoParaVer.direccion_administrador}
                </p>
              </div>
              <div>
                <strong className="text-gray-700">ID Usuario:</strong>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
                  {puntoParaVer.id_usuario}
                </span>
              </div>
              <div>
                <strong className="text-gray-700">Fecha Creación:</strong>
                <p className="mt-1 text-gray-600">
                  {formatearFecha(puntoParaVer.fecha_creacion)}
                </p>
              </div>
            </div>
            <button
              onClick={cerrarModalVer}
              className="mt-8 bg-blue-500 text-white px-8 py-3 rounded-lg w-full hover:bg-blue-600 transition-colors font-medium cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {mostrarModalEliminar && puntoParaEliminar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              <h2 className="font-bold text-xl text-gray-800">
                ¿Eliminar este punto?
              </h2>
              <p className="text-gray-600 mt-2">
                <strong>{puntoParaEliminar.nombre}</strong>
              </p>
            </div>
            <p className="text-gray-600 mb-8 text-center text-sm">
              Esta acción es permanente.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cerrarModalEliminar}
                className="flex-1 bg-gray-300 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors font-medium cursor-pointer"
                disabled={eliminando}
              >
                Cancelar
              </button>
              <button
                onClick={() => eliminarPunto(puntoParaEliminar.id)}
                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                disabled={eliminando}
              >
                {eliminando ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Eliminando...
                  </>
                ) : (
                  "Eliminar"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminView>
  );
};