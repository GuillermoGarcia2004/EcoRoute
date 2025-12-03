export const RecoverPassword = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-[#191C27]">
        <form action="" className="bg-[#362B32] w-[500px] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] p-5 rounded-[20px] flex flex-col gap-y-4 items-center justify-center">
            <a href="/">
              <img className="h-[250px] w-[250px]" src="/src/assets/img/logo.png" alt="Logo EcoRoute" />
            </a>
            <h1 className="text-[#EEEEFF] text-3xl font-bold font-[Cabin,sans-serif]">Recuperar contraseña</h1>
            <div className="border-[2px] border-solid border-[#EEEEFF] w-full flex items-center justify-items-start gap-x-2 p-2 rounded-[16px] bg-[#292929]">
                <img className="h-[35px] w-[35px]" src="/src/assets/icons/email.png" alt="Icono de email" />
                <input className="h-14 text-[16px] font-medium text-[#EEEEFF] w-full p-4 rounded-[16px] focus:outline-none focus:ring-0 border-none font-[Cabin,sans-serif]" type="text" placeholder="Correo electrónico"/>
            </div>
            <input className="font-[Cabin,sans-serif] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[22px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5 rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] w-[60%] bg-[#47863c]" type="submit" value="Recuperar contraseña" />
            <a className="text-[#47863c] text-[16px] font-[Cabin,sans-serif] hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease]" href="iniciar-sesion">Volver al login</a>
        </form>
    </div>
  );
};