export const Header = () => {
  return (
    <div className="bg-[#362B32] w-full flex items-center justify-between p-3 h-[10vh] font-[Cabin,sans-serif]">
        <div>
            <a href="/">
                <img className="h-[120px] w-[120px]" src="/src/assets/img/logo.png" alt="Logo EcoRoute" />
            </a>
        </div>
        <nav>
            <ul className="flex items-center justify-between gap-x-4 text-[16px] font-medium text-[#EEEEFF]">
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/">Inicio</a></li>
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/sobre-nosotros">Sobre nosotros</a></li>
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/informacion-reciclaje">Información sobre el reciclaje</a></li>
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/calendario-actividades">Calendario de actividades</a></li>
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/mapa">Puntos de reciclaje</a></li>
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/noticias-y-novedades">Noticias y novedades</a></li>
                <li><a className="hover:text-[#076d48] transition-[color] duration-[0.3s] ease-[ease] hover:text-[17px] hover:border-b-2 hover:border-[#076d48]" href="/preguntas-frecuentes">Preguntas frecuentes</a></li>
            </ul>
        </nav>
        <div className="flex items-center justify-center gap-x-2">
            <a className="shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[16px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5 rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] bg-[#47863c]" href="/iniciar-sesion">Iniciar sesión</a>
            <a className="shadow-[0_0_10px_2px_#47863c] border-2 border-solid border-[#47863c] text-[#EEEEFF] text-[16px] cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease] px-5 py-2.5 rounded-[5px] hover:bg-[#076d48] hover:border-[#076d48] bg-[#47863c]" href="/registrar-usuario">Registrarse</a>
        </div>
    </div>
  )
}