import { useState, useEffect } from "react";
import { AdminView } from "../layouts/AdminView";
import { ErrorMessage } from "../messages/ErrorMessage";
import { SuccessMessage } from "../messages/SuccessMessage";
export const GestionEventos = () => {
  const [eventos, setEventos] = useState([]);
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [eventoParaVer, setEventoParaVer] = useState(null);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [idUsuario, setIdUsuario] = useState("");
  // Estados del formulario de edición
  const [formDataEditar, setFormDataEditar] = useState({
    nombre: "",
    fecha: "",
    lugar: "",
  });
  // Estados del formulario de creación
  const [formDataCrear, setFormDataCrear] = useState({
    nombre: "",
    fecha: "",
    lugar: "",
    creador: "",
  });
  // Mensajes dentro de cada modal
  const [errorEditar, setErrorEditar] = useState("");
  const [successEditar, setSuccessEditar] = useState("");
  const [errorCrear, setErrorCrear] = useState("");
  const [successCrear, setSuccessCrear] = useState("");
  const formatearFecha = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    const dia = String(fecha.getDate()).padStart(2, "0");
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const año = fecha.getFullYear();
    return `${dia}-${mes}-${año}`;
  };
  const formatearFechaParaInput = (fechaString) => {
    if (!fechaString) return "";
    const fecha = new Date(fechaString);
    if (isNaN(fecha.getTime())) return "";
    const año = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");
    return `${año}-${mes}-${dia}`;
  };
  const validarFormulario = (formData) => {
    if (!formData.nombre.trim() || !formData.fecha || !formData.lugar.trim()) {
      return "Todos los campos son obligatorios";
    }
    return null;
  };
  const limpiarMensajesEditar = () => {
    setErrorEditar("");
    setSuccessEditar("");
  };
  const limpiarMensajesCrear = () => {
    setErrorCrear("");
    setSuccessCrear("");
  };
  const preguntarBorrarEvento = (evento) => {
    setEventoSeleccionado(evento);
    setMostrarModalEliminar(true);
  };
  const confirmarBorrado = async () => {
    if (!eventoSeleccionado) return;
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/ecoroute/eventos/${eventoSeleccionado.id_evento}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Error al borrar evento");
      setEventos(
        eventos.filter((e) => e.id_evento !== eventoSeleccionado.id_evento)
      );
      cerrarModalEliminar();
    } catch (error) {
      console.log(error);
    }
  };
  const cerrarModalEliminar = () => {
    setEventoSeleccionado(null);
    setMostrarModalEliminar(false);
  };
  const abrirModalVer = (evento) => {
    setEventoParaVer(evento);
    setMostrarModalVer(true);
  };
  const cerrarModalVer = () => {
    setEventoParaVer(null);
    setMostrarModalVer(false);
  };
  const abrirModalEditar = (evento) => {
    setEventoParaEditar(evento);
    setFormDataEditar({
      nombre: evento.nombre || "",
      fecha: formatearFechaParaInput(evento.fecha) || "",
      lugar: evento.lugar || "",
    });
    limpiarMensajesEditar();
    setMostrarModalEditar(true);
  };
  const cerrarModalEditar = () => {
    setEventoParaEditar(null);
    setFormDataEditar({ nombre: "", fecha: "", lugar: "" });
    limpiarMensajesEditar();
    setMostrarModalEditar(false);
  };
  const abrirModalCrear = () => {
    const idSesion = localStorage.getItem("idSesion") || "";
    setIdUsuario(idSesion);
    setFormDataCrear({ nombre: "", fecha: "", lugar: "", creador: idSesion });
    limpiarMensajesCrear();
    setMostrarModalCrear(true);
  };
  const cerrarModalCrear = () => {
    setFormDataCrear({ nombre: "", fecha: "", lugar: "", creador: "" });
    setIdUsuario("");
    limpiarMensajesCrear();
    setMostrarModalCrear(false);
  };
  const handleInputChangeEditar = (e) => {
    const { name, value } = e.target;
    setFormDataEditar((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorEditar) setErrorEditar("");
  };
  const handleInputChangeCrear = (e) => {
    const { name, value } = e.target;
    if (name === "creador") return;
    setFormDataCrear((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errorCrear) setErrorCrear("");
  };
  const guardarEvento = async (e) => {
    e.preventDefault();
    limpiarMensajesEditar();
    const error = validarFormulario(formDataEditar);
    if (error) {
      setErrorEditar(error);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/ecoroute/eventos/${eventoParaEditar.id_evento}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formDataEditar),
        }
      );
      if (!response.ok) throw new Error("Error al actualizar evento");
      setEventos(
        eventos.map((e) =>
          e.id_evento === eventoParaEditar.id_evento
            ? { ...e, ...formDataEditar }
            : e
        )
      );
      setSuccessEditar("Evento actualizado correctamente");
      setTimeout(() => {
        cerrarModalEditar();
      }, 1500);
    } catch (error) {
      setErrorEditar("Error al actualizar el evento");
    }
  };
  const crearEvento = async (e) => {
    e.preventDefault();
    limpiarMensajesCrear();
    const error = validarFormulario(formDataCrear);
    if (error) {
      setErrorCrear(error);
      return;
    }
    const dataEnviar = { ...formDataCrear, creador: idUsuario };
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/ecoroute/eventos/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dataEnviar),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error al crear evento");
      }
      const result = await response.json();
      const nuevoEvento = result.event; // ← Recibe el evento completo del backend
      setEventos((prev) => [nuevoEvento, ...prev]);
      setSuccessCrear("Evento creado correctamente");
      setTimeout(() => {
        cerrarModalCrear();
      }, 1500);
    } catch (error) {
      console.log("Error completo:", error);
      setErrorCrear(error.message || "Error al crear el evento");
    }
  };
  useEffect(() => {
    const obtenerEventos = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/ecoroute/eventos/");
        if (!response.ok) throw new Error("Error al obtener los eventos");
        const datos = await response.json();
        setEventos(datos.events || []);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerEventos();
  }, []);
  return (
    <AdminView>
      <div className="mb-5">
        <h1 className="text-white text-2xl">Listado de eventos:</h1>
        <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer" onClick={abrirModalCrear}>+ Añadir nuevo evento</button>
      </div>
      <div className="w-[80%] h-[500px] p-5 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {eventos.map((evento) => (
          <div
            key={evento.id_evento}
            className="bg-white border rounded-lg p-4 shadow-[11px_10px_5px_0px_rgba(0,0,0,0.75)]"
          >
            <h3 className="font-semibold">{evento.nombre}</h3>
            <p className="text-sm text-gray-500">
              Fecha: {formatearFecha(evento.fecha)}
            </p>
            <p className="text-xs text-indigo-600">Lugar: {evento.lugar}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="px-3 py-1 border rounded bg-blue-500 text-white text-sm cursor-pointer flex-1"
                onClick={() => abrirModalVer(evento)}
              >
                Ver
              </button>
              <button
                className="px-3 py-1 border rounded bg-yellow-500 text-white text-sm cursor-pointer flex-1"
                onClick={() => abrirModalEditar(evento)}
              >
                Editar
              </button>
              <button
                className="px-3 py-1 border rounded bg-red-600 text-white text-sm cursor-pointer flex-1"
                onClick={() => preguntarBorrarEvento(evento)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      {mostrarModalVer && eventoParaVer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="font-bold text-xl mb-4">{eventoParaVer.nombre}</h2>
            <div className="space-y-2 text-sm">
              <p>
                <strong>ID:</strong> {eventoParaVer.id_evento}
              </p>
              <p>
                <strong>Evento añadido por:</strong> {eventoParaVer.creador}
              </p>
              <p>
                <strong>Fecha:</strong> {formatearFecha(eventoParaVer.fecha)}
              </p>
              <p>
                <strong>Lugar:</strong> {eventoParaVer.lugar}
              </p>
            </div>
            <button
              onClick={cerrarModalVer}
              className="mt-6 bg-blue-500 text-white px-6 py-2 rounded w-full cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {mostrarModalEditar && eventoParaEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="font-bold text-xl mb-4">Editar Evento</h2>
            {errorEditar && (
              <ErrorMessage
                message={errorEditar}
                onClose={() => setErrorEditar("")}
              />
            )}
            {successEditar && (
              <SuccessMessage
                message={successEditar}
                onClose={() => setSuccessEditar("")}
              />
            )}
            <form onSubmit={guardarEvento} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formDataEditar.nombre}
                  onChange={handleInputChangeEditar}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formDataEditar.fecha}
                  onChange={handleInputChangeEditar}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lugar</label>
                <input
                  type="text"
                  name="lugar"
                  value={formDataEditar.lugar}
                  onChange={handleInputChangeEditar}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  Guardar
                </button>
                <button
                  type="button"
                  onClick={cerrarModalEditar}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {mostrarModalCrear && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto shadow-lg">
            <h2 className="font-bold text-xl mb-4">Nuevo Evento</h2>
            {errorCrear && (
              <ErrorMessage
                message={errorCrear}
                onClose={() => setErrorCrear("")}
              />
            )}
            {successCrear && (
              <SuccessMessage
                message={successCrear}
                onClose={() => setSuccessCrear("")}
              />
            )}
            <form onSubmit={crearEvento} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formDataCrear.nombre}
                  onChange={handleInputChangeCrear}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  value={formDataCrear.fecha}
                  onChange={handleInputChangeCrear}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Lugar</label>
                <input
                  type="text"
                  name="lugar"
                  value={formDataCrear.lugar}
                  onChange={handleInputChangeCrear}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Creador del evento
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
                  name="creador"
                  value={idUsuario}
                  readOnly
                  className="w-full p-2 border rounded bg-gray-200 cursor-not-allowed"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                >
                  Crear
                </button>
                <button
                  type="button"
                  onClick={cerrarModalCrear}
                  className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {mostrarModalEliminar && eventoSeleccionado && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <p>
              ¿Desea eliminar el evento{" "}
              <strong>{eventoSeleccionado.nombre}</strong>?
            </p>
            <div className="flex items-center justify-center gap-x-4 mt-6">
              <button
                onClick={confirmarBorrado}
                className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 cursor-pointer"
              >
                Confirmar
              </button>
              <button
                onClick={cerrarModalEliminar}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminView>
  );
};