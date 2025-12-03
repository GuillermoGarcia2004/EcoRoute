import { Container } from "../layouts/Container";

export const SobreNosotros = () => {
  return (
    <Container>
      <div className="w-full min-h-screen bg-gradient-to-b from-white to-green-50 px-6 py-16 md:px-20 overflow-hidden">
        <section className="max-w-5xl mx-auto text-center mb-24">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 animate-fade-in">
            Sobre Nosotros
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in-up">
            EcoRoute es una iniciativa en colaboración con el
            <span className="font-semibold text-green-800">
              {" "}
              Ayuntamiento de Peñaranda de Bracamonte
            </span>{" "}
            destinada a fomentar las buenas prácticas del reciclaje mediante
            actividades educativas y participativas dirigidas a toda la
            población.
          </p>
        </section>
        <section className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-28 hover:cursor-pointer">
          <div className="relative group">
            <img
              src="/src/assets/img/mision_sobre_nosotros.jpg"
              alt="Reciclaje"
              className="rounded-3xl shadow-xl transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-green-600 opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity duration-500"></div>
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-green-700 animate-slide-left">
              Nuestra Misión
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed animate-slide-left delay-150">
              Buscamos promover un futuro más sostenible mediante acciones que
              faciliten el aprendizaje del reciclaje, la reducción de residuos y
              el respeto por el entorno natural. Apostamos por una educación
              ambiental cercana, práctica y accesible.
            </p>
            <p className="text-gray-700 text-lg animate-slide-left delay-200">
              Organizamos talleres, charlas, jornadas de limpieza y actividades
              en familia para conseguir una ciudad más limpia, consciente y
              responsable.
            </p>
          </div>
        </section>
        <section className="max-w-6xl mx-auto mb-28">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-12">
            Nuestros Valores
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 hover:cursor-pointer">
            {[
              {
                title: "Concienciación",
                img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
                desc: "Impulsamos campañas educativas para enseñar la importancia del reciclaje.",
              },
              {
                title: "Compromiso Local",
                img: "https://images.unsplash.com/photo-1521791055366-0d553872125f",
                desc: "Trabajamos junto al Ayuntamiento para mejorar el entorno urbano.",
              },
              {
                title: "Participación",
                img: "https://images.unsplash.com/photo-1508873699372-7aeab60b44ab",
                desc: "Creemos en la fuerza de la comunidad para lograr un futuro sostenible.",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 animate-fade-in-up"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="rounded-xl w-full h-40 object-cover mb-5"
                />
                <h3 className="text-xl font-semibold text-green-700 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="max-w-5xl mx-auto text-center mt-10">
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            Únete a EcoRoute
          </h2>
          <p className="text-gray-700 text-lg mb-8">
            Forma parte del cambio y colabora con nosotros para construir una
            comunidad más responsable con el medio ambiente.
          </p>
          <a
            href="https://www.bracamonte.es/"
            target="_blank"
            className="inline-block bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition-colors duration-300 animate-pulse"
          >
            Contactar
          </a>
        </section>
      </div>
    </Container>
  );
};