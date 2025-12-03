import { useRef, useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import { Container } from "../layouts/Container";
import { FormularioBuscarRuta } from "../utils/FormularioBuscarRuta";

const apiKey = "TU_APIKEY";
const INITIAL_CENTER = [40.9, -5.2];
const INITIAL_ZOOM = 14;
export const RecycleMap = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [mode, setMode] = useState("driving-car");
  const [routeData, setRouteData] = useState(null);
  const [summary, setSummary] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultadoRuta, setResultadoRuta] = useState(null);
  const [error, setError] = useState(null);

  const [direcciones, setDirecciones] = useState([]);

  const mapRef = useRef();
  const getCoordinates = async (address) => {
    const response = await fetch(
      `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(
        address
      )}`
    );
    const data = await response.json();
    if (!data.features || data.features.length === 0) {
      throw new Error(`Dirección no encontrada: ${address}`);
    }
    return data.features[0].geometry.coordinates;
  };
  const fetchRoute = async () => {
    // Mantener compatibilidad si se llama directamente
    setLoading(true);
    try {
      const startCoord = await getCoordinates(start);
      const endCoord = await getCoordinates(end);
      setCoordinates([startCoord, endCoord]);
      const body = { coordinates: [startCoord, endCoord] };
      const response = await fetch(
        `https://api.openrouteservice.org/v2/directions/${mode}/geojson`,
        {
          method: "POST",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      setRouteData(data);
      const s = data.features[0].properties.summary;
      setSummary(s);
      setResultadoRuta({
        distancia: (s.distance / 1000).toFixed(2) + " km",
        tiempo: Math.round(s.duration / 60) + " min",
      });
      if (mapRef.current) {
        const bounds = L.geoJSON(data).getBounds();
        mapRef.current.fitBounds(bounds);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const clearMap = () => {
    setStart("");
    setEnd("");
    setCoordinates([]);
    setRouteData(null);
    setSummary(null);
    setResultadoRuta(null);
    setLoading(false);
    // Volver a centrar el mapa en Peñaranda de Bracamonte
    if (mapRef.current) {
      mapRef.current.setView(INITIAL_CENTER, INITIAL_ZOOM);
    }
  };
  useEffect(() => {
    const obtenerDirecciones = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/"
        );
        if (!response.ok) {
          throw new Error("Error al obtener las direcciones");
        }
        const datos = await response.json();
        setDirecciones(datos.recycles);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDirecciones();
  }, []);
  return (
    <Container>
      <div className="w-full py-16 px-6 md:px-20 bg-gradient-to-b from-white to-green-50">
        {/* TITULO */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-green-700 mb-6">
          Puntos de Reciclaje
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-center text-gray-700 max-w-3xl mx-auto mb-10">
          Descubre los puntos de reciclaje disponibles en Peñaranda de
          Bracamonte. EcoRoute, en colaboración con el Ayuntamiento, trabaja
          para fomentar prácticas responsables y sostenibles a través de
          actividades educativas y puntos de recogida accesibles para toda la
          población. Además, a continuación te facilitamos un buscador para que
          localice su punto de recogida más cercano.
        </p>

        {/* GRID DE PUNTOS */}
        <div className="grid gap-10 mt-10 md:grid-cols-2 lg:grid-cols-3">
          {direcciones.map((punto) => (
            <div
              key={punto.id}
              className="rounded-2xl border border-gray-200 shadow-xl hover:shadow-2xl transition hover:-translate-y-1 bg-white cursor-pointer"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-green-700">
                  {punto.nombre}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {punto.direccion_usuario}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  {punto.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mt-5 p-3 flex items-center justify-center">
        <FormularioBuscarRuta
          origen={start}
          setOrigen={setStart}
          destino={end}
          setDestino={setEnd}
          modo={
            mode === "driving-car"
              ? "moto"
              : mode === "foot-walking"
              ? "a pie"
              : "bici"
          }
          setModo={(m) => {
            // map radio selection to profile or state value
            if (m === "bici") setMode("cycling-regular");
            else if (m === "a pie") setMode("foot-walking");
            else setMode("driving-car");
          }}
          onBuscarRuta={async ({ origen, destino, modo }) => {
            setError(null);
            if (!origen || !destino) {
              setError("Por favor, indica origen y destino.");
              return;
            }
            setLoading(true);
            setRouteData(null);
            setSummary(null);
            setResultadoRuta(null);
            try {
              const startCoord = await getCoordinates(origen);
              const endCoord = await getCoordinates(destino);
              setCoordinates([startCoord, endCoord]);
              const profile =
                modo === "bici"
                  ? "cycling-regular"
                  : modo === "a pie"
                  ? "foot-walking"
                  : "driving-car";
              const body = { coordinates: [startCoord, endCoord] };
              const resp = await fetch(
                `https://api.openrouteservice.org/v2/directions/${profile}/geojson`,
                {
                  method: "POST",
                  headers: {
                    Authorization: apiKey,
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
                }
              );
              const data = await resp.json();
              if (!data || !data.features || data.features.length === 0) {
                throw new Error("Ruta no encontrada");
              }
              setRouteData(data);
              const s = data.features[0].properties.summary;
              setSummary(s);
              setResultadoRuta({
                distancia: (s.distance / 1000).toFixed(2) + " km",
                tiempo: Math.round(s.duration / 60) + " min",
              });
              if (mapRef.current) {
                const bounds = L.geoJSON(data).getBounds();
                mapRef.current.fitBounds(bounds);
              }
            } catch (err) {
              setError(err.message || "Error buscando la ruta");
            } finally {
              setLoading(false);
            }
          }}
          loading={loading}
          resultadoRuta={resultadoRuta}
          error={error}
          onClear={() => clearMap()}
        />
        {/* AQUÍ VA EL MAPA */}
        <MapContainer
          center={INITIAL_CENTER}
          zoom={INITIAL_ZOOM}
          style={{ height: "500px", width: "900px", marginRight: "100px" }}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {coordinates.length === 2 && (
            <>
              <Marker position={[coordinates[0][1], coordinates[0][0]]}>
                <Popup>Origen: {start}</Popup>
              </Marker>
              <Marker position={[coordinates[1][1], coordinates[1][0]]}>
                <Popup>Destino: {end}</Popup>
              </Marker>
            </>
          )}
          {routeData && (
            <GeoJSON data={routeData} style={{ color: "blue", weight: 5 }} />
          )}
        </MapContainer>
      </div>
    </Container>
  );
};