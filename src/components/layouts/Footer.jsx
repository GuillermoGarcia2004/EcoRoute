export const Footer = () => {
  const anioActual = new Date().getFullYear();
  return (
    <div className="bg-[#362B32] w-full flex items-center justify-between p-3 h-[10vh] font-[Cabin,sans-serif] text-white text-[15px]">
        <div>
            <p>&copy;{anioActual} Proyecto realizado por Guillermo García Gómez</p>
        </div>
        <div className="flex items-center justify-center gap-x-2">
            <div className="border border-solid border-white flex items-center justify-center p-[4px] rounded-2xl gap-x-2">
              <img className="h-[50px] w-[50px]" src="/src/assets/icons/facebook.png" alt="Logo Facebook" />
              <a href="https://www.facebook.com/people/Ayuntamiento-Pe%C3%B1aranda-de-Bracamonte/100064684336240/" target="_blank" rel="noopener noreferrer">Ayuntamiento de Peñaranda de Bracamonte</a>
            </div>
            <div className="border border-solid border-white flex items-center justify-center p-[4px] rounded-2xl gap-x-2">
              <img className="h-[50px] w-[50px]" src="/src/assets/icons/x.png" alt="Logo X" />
              <a href="https://x.com/AytoPenaranda" target="_blank" rel="noopener noreferrer">Ayuntamiento de Peñaranda de Bracamonte</a>
            </div>
            <div className="border border-solid border-white flex items-center justify-center p-[4px] rounded-2xl gap-x-2">
              <img className="h-[50px] w-[50px]" src="/src/assets/icons/instagram.png" alt="Logo Instagram" />
              <a href="https://www.instagram.com/aytopenaranda/?hl=es" target="_blank" rel="noopener noreferrer">Ayuntamiento de Peñaranda de Bracamonte</a>
            </div>
            <div className="border border-solid border-white flex items-center justify-center p-[4px] rounded-2xl gap-x-2">
              <img className="h-[50px] w-[50px]" src="/src/assets/icons/web.png" alt="Logo web" />
              <a href="https://www.bracamonte.es/" target="_blank" rel="noopener noreferrer">Ayuntamiento de Peñaranda de Bracamonte</a>
            </div>
        </div>
    </div>
  )
}