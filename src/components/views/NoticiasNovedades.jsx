import { Container } from "../layouts/Container";

export const NoticiasNovedades = () => {
  return (
    <Container>
            <div className="w-full min-h-screen bg-gray-50 px-6 py-14 md:px-16 lg:px-28">
      {/* Título principal */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight drop-shadow-sm animate-fadeIn">
          Noticias y Novedades
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto animate-fadeIn delay-200">
          Mantente al día con las últimas actividades, campañas y avances relacionados
          con el reciclaje en Ecoroute junto al Ayuntamiento de Peñaranda de Bracamonte.
        </p>
      </section>

      {/* Tarjetas de noticias */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 animate-fadeIn delay-300">
        {/* Noticia 1 */}
        <article className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
          <img
            src="/src/assets/img/impacto_ambiental.jpg"
            alt="Reciclaje"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Nueva campaña de concienciación</h2>
            <p className="text-gray-600 mb-3">
              Lanzamos una nueva campaña educativa para mejorar las prácticas de reciclaje
              en la comunidad con actividades para todas las edades.
            </p>
            <button className="text-green-700 font-semibold hover:text-green-900 transition-colors">
              Leer más →
            </button>
          </div>
        </article>

        {/* Noticia 2 */}
        <article className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
          <img
            src="/src/assets/img/contenedores.jpg"
            alt="Punto de reciclaje"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Nuevos puntos de reciclaje</h2>
            <p className="text-gray-600 mb-3">
              El Ayuntamiento ha habilitado nuevas zonas de recogida selectiva en áreas
              estratégicas para facilitar el reciclaje a la población.
            </p>
            <button className="text-green-700 font-semibold hover:text-green-900 transition-colors">
              Leer más →
            </button>
          </div>
        </article>

        {/* Noticia 3 */}
        <article className="bg-white shadow-lg rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            alt="Actividad educativa"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-green-700 mb-2">Talleres para jóvenes</h2>
            <p className="text-gray-600 mb-3">
              Se organizan talleres interactivos para enseñar a los jóvenes la importancia
              del reciclaje y cómo clasificar los residuos correctamente.
            </p>
            <button className="text-green-700 font-semibold hover:text-green-900 transition-colors">
              Leer más →
            </button>
          </div>
        </article>
      </section>

      {/* Animaciones personalizadas */}
      <style>{`
        .animate-fadeIn {
          opacity: 0;
          animation: fadeIn 0.8s forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </div>
    </Container>
  );
};