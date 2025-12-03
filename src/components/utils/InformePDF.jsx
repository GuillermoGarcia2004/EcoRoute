import { forwardRef } from "react";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  padding: "10px",
};

const sectionTitleStyle = {
  fontSize: 22,
  color: "darkgreen",
  fontWeight: "bold",
  marginTop: "25px",
  marginBottom: "5px",
  borderBottom: "2px solid darkgreen",
  paddingBottom: "5px",
};

const tableStyle = {
  width: "100%",
  border: "1px solid black",
  borderRadius: 16,
  backgroundColor: "white",
  borderCollapse: "collapse",
  overflow: "hidden",
};

const thStyle = {
  backgroundColor: "#b7e8b7",
  padding: "10px",
  borderBottom: "1px solid black",
  color: "darkgreen",
  fontWeight: "bold",
  textAlign: "center",
};

const tdStyle = {
  borderBottom: "1px solid #ccc",
  padding: "8px",
  fontSize: 12,
};

const rowEven = {
  backgroundColor: "#f2fff2",
};

const h1Style = {
  fontSize: 30,
  color: "darkgreen",
  textAlign: "center",
  fontWeight: "bold",
  marginBottom: 10,
};

export const InformePDF = forwardRef(
  ({ usuarios, eventos, puntosReciclaje, recompensas }, ref) => {
    return (
      <div ref={ref}>
        <h1 style={h1Style}>Informe completo EcoRoute - {new Date().toLocaleDateString("es-ES")}</h1>
        <h2 style={sectionTitleStyle}>Resumen general</h2>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Categoría</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Usuarios registrados", usuarios.length],
              ["Eventos creados", eventos.length],
              ["Puntos de reciclaje", puntosReciclaje.length],
              ["Recompensas disponibles", recompensas.length],
            ].map(([label, value], i) => (
              <tr key={i} style={i % 2 === 0 ? rowEven : {}}>
                <td style={tdStyle}>{label}</td>
                <td style={tdStyle}>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={containerStyle}>
          <h2 style={sectionTitleStyle}>Usuarios</h2>
          {usuarios.map((u) => (
            <table key={u.id_usuario} style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="2" style={thStyle}>
                    Usuario {u.id_usuario}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["ID", u.id_usuario],
                  ["Nombre", `${u.nombre} ${u.apellidos}`],
                  ["Email", u.email],
                  ["Teléfono", u.telefono],
                  ["Puntos", u.puntos],
                  ["Rol", u.rol],
                  ["Estado", u.estado],
                  ["Pendiente de baja", u.pendiente_baja],
                  [
                    "Fecha de registro",
                    new Date(u.fecha_creacion).toLocaleDateString("es-ES"),
                  ],
                ].map(([label, value], i) => (
                  <tr key={i} style={i % 2 === 0 ? rowEven : {}}>
                    <td style={tdStyle}>{label}</td>
                    <td style={tdStyle}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
          <h2 style={sectionTitleStyle}>Eventos</h2>
          {eventos.map((e) => (
            <table key={e.id_evento} style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="2" style={thStyle}>
                    Evento {e.id_evento}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Creador", e.creador],
                  ["Nombre", e.nombre],
                  ["Lugar", e.lugar],
                  [
                    "Fecha del evento",
                    new Date(e.fecha).toLocaleDateString("es-ES"),
                  ],
                ].map(([label, value], i) => (
                  <tr key={i} style={i % 2 === 0 ? rowEven : {}}>
                    <td style={tdStyle}>{label}</td>
                    <td style={tdStyle}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
          <h2 style={sectionTitleStyle}>Puntos de Reciclaje</h2>
          {puntosReciclaje.map((p) => (
            <table key={p.id} style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="2" style={thStyle}>
                    Punto de recogida {p.id}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nombre", p.nombre],
                  ["Descripción", p.descripcion],
                  [
                    "Fecha de creación",
                    new Date(p.fecha_creacion).toLocaleDateString("es-ES"),
                  ],
                  ["Dirección usuario", p.direccion_usuario],
                  ["Dirección administrador", p.direccion_administrador],
                ].map(([label, value], i) => (
                  <tr key={i} style={i % 2 === 0 ? rowEven : {}}>
                    <td style={tdStyle}>{label}</td>
                    <td style={tdStyle}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
          <h2 style={sectionTitleStyle}>Recompensas</h2>
          {recompensas.map((r) => (
            <table key={r.id} style={tableStyle}>
              <thead>
                <tr>
                  <th colSpan="2" style={thStyle}>
                    Recompensa {r.id}
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Nombre", r.nombre],
                  ["Descripción", r.descripcion],
                  ["Valor", `${r.valor} puntos`],
                ].map(([label, value], i) => (
                  <tr key={i} style={i % 2 === 0 ? rowEven : {}}>
                    <td style={tdStyle}>{label}</td>
                    <td style={tdStyle}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      </div>
    );
  }
);