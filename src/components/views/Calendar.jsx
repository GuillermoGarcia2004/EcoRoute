import { Container } from "../layouts/Container";
import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import esLocale from "@fullcalendar/core/locales/es";
export const Calendar = () => {
  const [tooltip, setTooltip] = useState({visible: false, x: 0, y: 0, content: ""});
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true); 
  const getEventos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/eventos/");
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      const mapped = (data.events || []).map((ev) => ({
        id: String(ev.id_evento),
        title: ev.nombre,
        start: ev.fecha,
        color: "#000",
        textColor: "#fff",
        extendedProps: { location: ev.lugar },
      }));
      setEventos(mapped);
    } catch (error) {
      console.error("Error al obtener eventos:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getEventos();
  }, []);
  const handleEventMouseEnter = (mouseEnterInfo) => {
    const { clientX, clientY } = mouseEnterInfo.jsEvent;
    const location = mouseEnterInfo.event.extendedProps?.location || "Lugar no disponible";
    const startDate = mouseEnterInfo.event.start;
    let formattedDate = "Fecha no disponible";
    if (startDate instanceof Date && !isNaN(startDate)) {
      const day = String(startDate.getDate()).padStart(2, "0");
      const month = String(startDate.getMonth() + 1).padStart(2, "0");
      const year = startDate.getFullYear();
      formattedDate = `${day}-${month}-${year}`;
    }
    setTooltip({visible: true, x: clientX, y: clientY, content: `Evento: ${mouseEnterInfo.event.title}\nFecha: ${formattedDate}\nLugar: ${location}`});
  };
  const handleEventMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, content: "" });
  };
  return (
    <>
      <style>
        {`
          .fc-event {
            cursor: pointer;
            text-align: center;
          }
        `}
      </style>
      <Container>
          <div className="max-w-[900px] mx-auto my-[20px] bg-white text-black rounded-xl shadow-lg p-6 min-h-[400px] flex items-center justify-center">
            {loading ? (
              <p className="text-lg text-gray-600 animate-pulse">
                Cargando eventos...
              </p>
            ) : (
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              locale={esLocale}
              dayHeaderFormat={{ weekday: "long" }}
              headerToolbar={{right: "next today", center: "title", left: "prev"}}
              events={eventos}
              height="auto"
              eventMouseEnter={handleEventMouseEnter}
              eventMouseLeave={handleEventMouseLeave}
            />
            )}
            {tooltip.visible && (
              <div
                style={{
                  position: "fixed",
                  top: tooltip.y + 10,
                  left: tooltip.x + 10,
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "white",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  pointerEvents: "none",
                  zIndex: 9999,
                  whiteSpace: "pre-line",
                  fontSize: "0.85rem",
                }}
              >
                {tooltip.content}
              </div>
            )}
        </div>
      </Container>
    </>
  );
};