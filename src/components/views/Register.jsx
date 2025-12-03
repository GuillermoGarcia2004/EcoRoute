import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "./../messages/ErrorMessage";
import { InformacionRegistro } from "./../messages/InformacionRegistro";
import { SuccessMessage } from "./../messages/SuccessMessage";

const url = "http://localhost:3000/api/v1/ecoroute/usuarios/auth/registro";
export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [errorApi, setErrorApi] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const password = watch("password");
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setErrorApi("");
    setMensajeExito("");
    try {
      const payLoad = {
        email: data.email,
        nombre: data.nombre,
        apellidos: data.apellidos,
        telefono: data.telefono,
        hash: data.password,
      };
      const respuesta = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payLoad),
      });
      const resultado = await respuesta.json();
      if (!respuesta.ok) {
        setErrorApi(resultado.error);
      } else {
        setMensajeExito(resultado.mensaje);
      }
    } catch {
      setErrorApi("Error al crear el usuario");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-[#191C27]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#362B32] w-[800px] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] p-5 rounded-[20px] flex flex-col gap-y-4 items-center justify-center"
      >
        <a href="/">
          <img
            className="h-[250px] w-[250px]"
            src="/src/assets/img/logo.png"
            alt="Logo EcoRoute"
          />
        </a>
        <h1 className="text-[#EEEEFF] text-3xl font-bold font-[Cabin,sans-serif]">
          Registro de usuarios
        </h1>
        {errorApi && <ErrorMessage message={errorApi} />}
        {mensajeExito && <SuccessMessage message={mensajeExito} />}
        <div className="flex items-center justify-center gap-x-4 w-full">
          <div className="flex flex-col items-center justify-center gap-y-4 w-[50%]">
            {errors.email && (
              <InformacionRegistro message={errors.email.message} />
            )}
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
              <img
                className="h-[35px] w-[35px]"
                src="/src/assets/icons/email.png"
                alt="Icono de email"
              />
              <input
                {...register("email", {
                  required: "*El correo es obligatorio*",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Email no válido",
                  },
                })}
                className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
                type="email"
                placeholder="Correo electrónico"
              />
            </div>
            {errors.nombre && (
              <InformacionRegistro message={errors.nombre.message} />
            )}
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
              <img
                className="h-[35px] w-[35px]"
                src="/src/assets/icons/user.png"
                alt="Icono de usuario"
              />
              <input
                {...register("nombre", {
                  required: "*El nombre es obligatorio*",
                })}
                className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
                type="text"
                placeholder="Nombre"
              />
            </div>
            {errors.apellidos && (
              <InformacionRegistro message={errors.apellidos.message} />
            )}
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
              <img
                className="h-[35px] w-[35px]"
                src="/src/assets/icons/user.png"
                alt="Icono de usuario"
              />
              <input
                {...register("apellidos", {
                  required: "*Los apellidos son obligatorio*",
                })}
                className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
                type="text"
                placeholder="Apellidos"
              />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-y-4 w-[50%]">
            {errors.telefono && (
              <InformacionRegistro message={errors.telefono.message} />
            )}
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
              <img
                className="h-[35px] w-[35px]"
                src="/src/assets/icons/telephone.png"
                alt="Icono de telefono"
              />
              <input
                {...register("telefono", {
                  required: "*El teléfono es obligatorio*",
                  pattern: {
                    value: /^\d{9}$/,
                    message: "El teléfono debe tener 9 números",
                  },
                })}
                className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
                type="text"
                placeholder="Teléfono"
              />
            </div>
            {errors.password && (
              <InformacionRegistro message={errors.password.message} />
            )}
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
              <img
                className="h-[35px] w-[35px]"
                src="/src/assets/icons/key.png"
                alt="Icono de llave"
              />
              <input
                {...register("password", {
                  required: "*La clave es obligatoria*",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "La clave debe tener mínimo 8 caracteres, una minúscula y una mayúscula",
                  },
                })}
                className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
                type="password"
                placeholder="Clave"
              />
            </div>
            {errors.passwordRepeat && (
              <InformacionRegistro message={errors.passwordRepeat.message} />
            )}
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
              <img
                className="h-[35px] w-[35px]"
                src="/src/assets/icons/key.png"
                alt="Icono de llave"
              />
              <input
                {...register("passwordRepeat", {
                  required: "*Repetir clave es obligatorio*",
                  validate: (value) =>
                    value === password || "Las claves no coinciden",
                })}
                className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]"
                type="password"
                placeholder="Repetir clave"
              />
            </div>
          </div>
        </div>
        <input
          className="font-[Cabin,sans-serif] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[22px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5 rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] w-[60%] bg-[#47863c]"
          type="submit"
          value="Registrar usuario"
        />
      </form>
    </div>
  );
};