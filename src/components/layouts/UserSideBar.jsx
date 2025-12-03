export const UserSideBar = ({ usuario, cerrarSesion }) => {
  return (
    <div className="w-64 bg-[#362B32] border-r-2 border-solid border-[#47863c] min-h-screen p-4 flex flex-col items-center justify-items-start">
      <img className="h-[160px] w-[160px]" src="/src/assets/img/logo.png" alt="Logo EcoRoute" />
      <div className="bg-[#191C27] border-2 border-solid border-[#191C27] p-3 rounded-2xl mb-5 w-full text-white">
        <div className="flex items-center justify-center flex-col gap-y-4">
          <div className="rounded-full bg-white flex items-center justify-center h-[70px] w-[70px]">
            <img className="h-[60px] w-[60px]" src={`/src/assets/icons/${usuario.perfil}`} alt={`${usuario.nombre} ${usuario.apellidos}`} />
          </div>
          <div>
            <p>{usuario.nombre} {usuario.apellidos}</p>
            <p>Puntos: {usuario.puntos}</p>
            <p className="mb-3">{usuario.rol}</p>
            <a className="p-[3px] shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[16px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] bg-[#47863c]" onClick={cerrarSesion} >
              Cerrar sesión
            </a>
          </div>
        </div>
      </div>
      <nav className="space-y-2 w-full">
        <ul className="text-white text-[16px] text-center">
          <li className="border-2 border-solid border-[#47863c] p-3 rounded-2xl mb-5">
            <a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/subir-evidencias">Subir evidencias</a>
          </li>
          <li className="border-2 border-solid border-[#47863c] p-3 rounded-2xl mb-5">
            <a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/comprar-recompensas">Comprar recompensa</a>
          </li>
          <li className="border-2 border-solid border-[#47863c] p-3 rounded-2xl mb-5">
            <a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/ver-recompensas">Ver recompensas adquiridas</a>
          </li>
          <li className="border-2 border-solid border-[#47863c] p-3 rounded-2xl mb-5">
            <a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/ver-recompensas-canjeadas">Ver recompensas canjeadas</a>
          </li>
          <li className="border-2 border-solid border-[#47863c] p-3 rounded-2xl mb-5">
            <a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/eliminar-cuenta">Eliminar cuenta</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};