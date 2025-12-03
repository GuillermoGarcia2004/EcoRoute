import { useState, useEffect } from "react";
import "/src/assets/css/style.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// PARA LA WEB PRINCIPAL
import { HomePage } from "./components/views/HomePage";
import { SobreNosotros } from "./components/views/SobreNosotros";
import { InformacionReciclaje } from "./components/views/InformacionReciclaje";
import { Calendar } from "./components/views/Calendar";
import { RecycleMap } from "./components/views/RecycleMap";
import { NoticiasNovedades } from "./components/views/NoticiasNovedades";
import { PreguntasFrecuentes } from "./components/views/PreguntasFrecuentes";
// PARA MANEJAR LA SESIÓN DEL USUARIO
import { Login } from "./components/views/Login";
import { RecoverPassword } from "./components/views/RecoverPassword";
import { Register } from "./components/views/Register";
import { ConfirmarActivarCuenta } from "./components/views/ConfirmarActivarCuenta";
// PARA LOS ADMINISTRADORES LOGUEADOS
import { GestionUsuarios } from "./components/views/GestionUsuarios";
import { BorrarUsuarios } from "./components/views/BorrarUsuarios";
import { GestionEventos } from "./components/views/GestionEventos";
import { GestionPuntosReciclaje } from "./components/views/GestionPuntosReciclaje";
import { GestionRecompensas } from "./components/views/GestionRecompensas";
import { GenerarPDF } from "./components/views/GenerarPDF";
// PARA LOS USUARIOS LOGUEADOS
import { SubirEvidencias } from "./components/views/SubirEvidencias";
import { ComprarRecompensas } from "./components/views/ComprarRecompensas";
import { ListarRecompensas } from "./components/views/ListarRecompensas";
import { RecompensasCanjeadas } from "./components/views/RecompensasCanjeadas";
import { EliminarCuenta } from "./components/views/EliminarCuenta";
// HOMEPAGES DE LOS USUARIOS
import { AdminHomePage } from "./components/views/AdminHomePage";
import { UserHomePage } from "./components/views/UserHomePage";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("idSesion")));
  const [userRole, setUserRole] = useState(localStorage.getItem("rolUsuario"));
  useEffect(() => {
    const checkSession = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("idSesion")));
      setUserRole(localStorage.getItem("rolUsuario"));
    };
    // Detecta cambios en localStorage (por ejemplo, cierre de sesión desde otra pestaña)
    const onStorage = (e) => {
      if (e.key === "idSesion" || e.key === "rolUsuario") checkSession();
    };
    // Eventos personalizados (usados por Login/Logout)
    const onLogin = () => checkSession();
    const onLogout = () => checkSession();
    window.addEventListener("storage", onStorage);
    window.addEventListener("login", onLogin);
    window.addEventListener("logout", onLogout);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("login", onLogin);
      window.removeEventListener("logout", onLogout);
    };
  }, []);
  // Decide qué vista mostrar según la sesión y el rol
  const getMainView = () => {
    if (isLoggedIn && userRole === "Administrador") return <AdminHomePage />;
    if (isLoggedIn && userRole === "Usuario") return <UserHomePage/>;
    return <HomePage />;
  };
  return (
    <Router>
      <Routes>
        <Route path="/" element={getMainView()} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/informacion-reciclaje" element={<InformacionReciclaje />} />
        <Route path="/calendario-actividades" element={<Calendar />} />
        <Route path="/mapa" element={<RecycleMap />} />
        <Route path="/noticias-y-novedades" element={<NoticiasNovedades />} />
        <Route path="/preguntas-frecuentes" element={<PreguntasFrecuentes />} />
        <Route path="/iniciar-sesion" element={<Login />} />
        <Route path="/recuperar-clave" element={<RecoverPassword />} />
        <Route path="/registrar-usuario" element={<Register />} />
        <Route path="/activar-cuenta" element={<ConfirmarActivarCuenta />} />
        {isLoggedIn && userRole === "Administrador" && (
          <>
            <Route path="/ver-y-editar-usuarios" element={<GestionUsuarios />} />
            <Route path="/peticiones-borrar-usuarios" element={<BorrarUsuarios />} />
            <Route path="/gestionar-eventos" element={<GestionEventos />} />
            <Route path="/gestionar-puntos-reciclaje" element={<GestionPuntosReciclaje />} />
            <Route path="/gestionar-recompensas" element={<GestionRecompensas />} />
            <Route path="/generar-pdf" element={<GenerarPDF />} />
          </>
        )}
        {isLoggedIn && userRole === "Usuario" && (
          <>
            <Route path="/subir-evidencias" element={<SubirEvidencias />} />
            <Route path="/comprar-recompensas" element={<ComprarRecompensas />} />
            <Route path="/ver-recompensas" element={<ListarRecompensas />} />
            <Route path="/ver-recompensas-canjeadas" element={<RecompensasCanjeadas />} />
            <Route path="/eliminar-cuenta" element={<EliminarCuenta />} />
        </>
        )}
      </Routes>
    </Router>
  );
}
export default App;