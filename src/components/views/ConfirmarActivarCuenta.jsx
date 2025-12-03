export const ConfirmarActivarCuenta = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-[#191C27]">
        <div className="bg-[#362B32] w-[500px] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] p-5 rounded-[20px] flex flex-col gap-y-4 items-center justify-center">
            <img className="h-[250px] w-[250px]" src="/src/assets/img/logo.png" alt="Logo EcoRoute" />
            <h1 className="text-[#EEEEFF] text-3xl font-bold font-[Cabin,sans-serif]">¡Cuenta activada correctamente!</h1>
            <p className="text-white">
                Muchas gracias por activar tu cuenta. Estamos muy contento de tenerte por aquí. Por favor, pulsa
                el siguiente botón para iniciar sesión y disfrutar de todas las ventajas que has adquirido.
            </p>
            <a className="shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[16px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5 rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] bg-[#47863c]" href="/">Ir al login</a>
        </div>
    </div>
  );
};