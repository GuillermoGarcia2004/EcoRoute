import { useState, useRef, useEffect } from "react";
import { AdminView } from "../layouts/AdminView";
import PdfGenerator from "../utils/PdfGenerator";
import { InformePDF } from "../utils/InformePDF";
export const GenerarPDF = () => {
  const contentRef = useRef(null);
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [puntosReciclaje, setPuntosReciclaje] = useState([]);
  const [recompensas, setRecompensas] = useState([]);
  // Función para obtener los usuarios
  const obtenerUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/usuarios/all");
      if (!response.ok) {
        throw new Error("Error al obtener las usuarios");
      }
      const datos = await response.json();
      return datos.users;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // Función para obtener los eventos
  const obtenerEventos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/eventos/");
      if (!response.ok) {
        throw new Error("Error al obtener los eventos");
      }
      const datos = await response.json();
      return datos.events;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // Función para obtener los puntos de reciclaje
  const obtenerPuntosReciclaje = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/puntos_reciclaje/");
      if (!response.ok) {
        throw new Error("Error al obtener los puntos de reciclaje");
      }
      const datos = await response.json();
      return datos.recycles;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // Función para obtener las recompensas
  const obtenerRecompensas = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/ecoroute/recompensas/");
      if (!response.ok) {
        throw new Error("Error al obtener las recompensas");
      }
      const datos = await response.json();
      return datos.recompensas;
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  // UseEffect para obtener todos los datos que necesito para generar mi PDF
  useEffect(() => {
    const fetchData = async () => {
      const usuariosData = await obtenerUsuarios();
      setUsuarios(usuariosData);
      const eventosData = await obtenerEventos();
      setEventos(eventosData);
      const puntosData = await obtenerPuntosReciclaje();
      setPuntosReciclaje(puntosData);
      const recompensasData = await obtenerRecompensas();
      setRecompensas(recompensasData);
    };
    fetchData();
  }, []);
  return (
    <AdminView>
      <div className="h-[300px] w-[500px] bg-white rounded-xl p-5 border-2 border-solid border-[#47863c]">
        <h1 className="text-center text-2xl text-indigo-600 font-bold mb-5">Generar informe PDF</h1>
        <p className="text-[17px] font-medium text-green-600">
          Desde este panel puedes generar un informe completo en formato PDF con
          información detallada sobre{" "}
          <strong>usuarios, eventos, puntos de reciclaje</strong> y{" "}
          <strong>recompensas disponibles</strong>. Pulsa el botón de abajo para
          generar tu documento.
        </p>
        <div className="mt-5"><PdfGenerator.DownloadFromHtml targetRef={contentRef} fileName="informePDF_EcoRoute.pdf" /></div>
      </div>
      <details>
        <summary className="cursor-pointer text-white text-center mt-4">Ver previsualización del documento PDF generado automáticamente</summary>
        <div className="bg-white w-[900px] h-[500px] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-black/80 [&::-webkit-scrollbar-thumb]:rounded-full"> 
          <InformePDF usuarios={usuarios} eventos={eventos} puntosReciclaje={puntosReciclaje} recompensas={recompensas} ref={contentRef} />
        </div>
      </details>
    </AdminView>
  );
};