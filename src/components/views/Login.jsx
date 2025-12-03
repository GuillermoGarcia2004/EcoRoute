import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "../messages/ErrorMessage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validación antes del fetch
    if (!email.trim() || !clave.trim()) {
      setError("El email y la clave son obligatorios");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:3000/api/v1/ecoroute/usuarios/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, clave }),
        }
      );

      const data = await res.json().catch(() => ({}));
      const apiError = data?.error ?? data?.mensaje ?? data?.message ?? null;

      if (!res.ok) {
        throw new Error(apiError || `Error en la autenticación (status ${res.status})`);
      }

      const idSesion = data?.user?.id_usuario ?? null;
      const rolUsuario = data?.user?.rol ?? null;
      if (!idSesion) {
        throw new Error(apiError || "No se recibió id del usuario desde el servidor");
      }

      localStorage.setItem("idSesion", String(idSesion));
      localStorage.setItem("rolUsuario", String(rolUsuario));
      window.dispatchEvent(new Event("login"));
      navigate("/");
    } catch (err) {
      setError(err?.message || "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-[#191C27]">
      <form
        onSubmit={handleSubmit}
        className="bg-[#362B32] w-[500px] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] p-5 rounded-[20px] flex flex-col gap-y-4 items-center justify-center"
      >
        <a href="/" className="mb-2">
          <img className="h-[150px] w-[150px]" src="/src/assets/img/logo.png" alt="Logo EcoRoute" />
        </a>

        <h1 className="text-[#EEEEFF] text-3xl font-bold font-[Cabin,sans-serif]">Bienvenid@ a EcoRoute</h1>

        {error && (
          // usar componente ErrorMessage si existe
          typeof ErrorMessage === "function" ? (
            <ErrorMessage message={error} />
          ) : (
            <div className="text-red-400 text-sm bg-red-900/30 px-3 py-1 rounded">{error}</div>
          )
        )}

        <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center gap-x-2 p-2 rounded-[16px] bg-[#292929]">
          <img className="h-[35px] w-[35px]" src="/src/assets/icons/email.png" alt="Icono de email" />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
            type="text"
            placeholder="Correo electrónico"
            aria-label="Correo electrónico"
          />
        </div>

        <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center gap-x-2 p-2 rounded-[16px] bg-[#292929]">
          <img className="h-[35px] w-[35px]" src="/src/assets/icons/key.png" alt="Icono de llave" />
          <input
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
            type="password"
            placeholder="Clave"
            aria-label="Clave"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="font-[Cabin,sans-serif] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[22px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5 rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] w-[60%] bg-[#47863c] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>

        <a className="text-[#47863c] text-[16px] font-[Cabin,sans-serif] hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease]" href="recuperar-clave">
          ¿Olvidaste tu contraseña?
        </a>
      </form>
    </div>
  );
};