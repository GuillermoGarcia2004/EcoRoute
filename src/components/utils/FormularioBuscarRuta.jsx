import { useState, useEffect } from "react";
import { ErrorMessage } from "../messages/ErrorMessage";
export function FormularioBuscarRuta({origen, setOrigen, destino, setDestino, modo, setModo, onBuscarRuta, loading, resultadoRuta, onClear, error}) {
  const [dots, setDots] = useState("");
  const [direcciones, setDirecciones] = useState([]);
  useEffect(() => {
    if (!loading) {
      setDots("");
      return;
    }
    let i = 0;
    const interval = setInterval(() => {
      setDots(".".repeat(i % 4));
      i++;
    }, 400);
    return () => clearInterval(interval);
  }, [loading]);
  useEffect(() => {
    const obtenerDirecciones = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/listar_direcciones/");
        if (!response.ok) {
          throw new Error("Error al obtener las direcciones");
        }
        const datos = await response.json();
        setDirecciones(datos.directions);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDirecciones();
  }, []);
  return (
    <form onSubmit={(e) => {e.preventDefault(); onBuscarRuta({ origen, destino, modo }); }} className="mx-auto bg-[#362B32] p-6 rounded-xl shadow-lg border border-[#47863c] w-[400px] font-[Cabin,sans-serif] text-white font-medium backdrop-blur-md">
      <h2 className="text-2xl font-semibold text-[#63e6be] mb-6 text-center border-b border-[#47863c] pb-2">Buscar ruta</h2>
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="origen" className="block text-sm mb-1 text-[#63e6be]">Origen</label>
        <details>
          <summary className="cursor-pointer">Información</summary>
          <p>Formato de búsqueda: Calle [nombre de la calle], [número (opcional)], Peñaranda de Bracamonte</p>
        </details>
        <input type="text" id="origen" name="origen" placeholder="Ingresa el punto de partida" className="w-full p-2 border border-[#47863c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63e6be] bg-[#1a1a1a]" value={origen} onChange={(e) => setOrigen(e.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="destino" className="block text-sm mb-1 text-[#63e6be]">Destino</label>
        <select name="destino" id="destino" onChange={(e) => setDestino(e.target.value)} className="w-full p-2 border border-[#47863c] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#63e6be] bg-[#1a1a1a] mt-2">
          <option value="">Selecciona una dirección</option>
          {direcciones.map((d) => (
            <option key={d.id} value={d.direccion_usuario}>
              {d.direccion_usuario}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <span className="block text-sm mb-2 text-[#63e6be]">Medio de transporte</span>
        <div className="flex items-center justify-around">
          {["bici", "a pie", "moto"].map((m) => (
            <label key={m} className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="modo" value={m} checked={modo === m} onChange={() => setModo(m)} className="text-[#63e6be] focus:ring-[#63e6be]" />
              <span style={{ textTransform: "capitalize" }}>{m}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" className="flex-1 bg-[#47863c] text-white font-semibold py-2 rounded-lg hover:bg-[#357d4e] transition duration-200 cursor-pointer" disabled={loading}>
          {loading ? `Buscando${dots}` : "Buscar"}
        </button>
        <button type="button" onClick={() => {if (onClear) onClear();}} className="flex-none bg-transparent border border-[#47863c] text-[#63e6be] font-semibold py-2 px-4 rounded-lg hover:bg-[#1f2b26] transition duration-200 cursor-pointer" disabled={loading}>
          Limpiar
        </button>
      </div>
      {resultadoRuta && (
        <div className="mt-4 text-center text-[#63e6be]">
          <div>Distancia: {resultadoRuta.distancia}</div>
          <div>Tiempo: {resultadoRuta.tiempo}</div>
        </div>
      )}
    </form>
  );
}