import { Container } from "../layouts/Container";

export const HomePage = () => {
  return (
    <Container>
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 h-[80vh] text-white">
        <div className="w-full bg-gray-50">
          <section className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-90"></div>
            <div className="absolute inset-0">
              <div className="w-32 h-32 bg-white/10 rounded-full absolute -top-10 -left-10 animate-pulse"></div>
              <div className="w-48 h-48 bg-white/10 rounded-full absolute bottom-0 right-0 animate-bounce"></div>
            </div>
            <div className="relative z-10 max-w-5xl mx-auto py-32 px-6 text-center text-white animate-fadeIn">
              <h1 className="text-5xl font-bold drop-shadow-lg">
                EcoRoute: Reciclar para un Futuro Mejor
              </h1>
              <p className="mt-6 text-lg max-w-3xl mx-auto">
                En colaboración con el Ayuntamiento de Peñaranda de Bracamonte,
                EcoRoute impulsa actividades para concienciar a la población
                sobre las buenas prácticas del reciclaje.
              </p>
              <a
                href="#actividades"
                className="mt-8 inline-block bg-white text-green-700 px-8 py-3 rounded-xl shadow-lg font-semibold hover:scale-105 transition-transform"
              >
                Descubre más
              </a>
            </div>
          </section>
          <section className="py-20 px-6 max-w-6xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-green-700 mb-4">
              Compromiso con el Medio Ambiente
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              De la mano del Ayuntamiento de Peñaranda de Bracamonte, trabajamos
              para ofrecer eventos, talleres y recursos que fomentan la
              sostenibilidad y el reciclaje responsable.
            </p>
            <img
              src="/src/assets/img/portada_homepage.png"
              alt="Reciclaje colaborativo"
              className="mt-10 rounded-2xl shadow-xl mx-auto hover:scale-105 transition-transform duration-500 hover:cursor-pointer"
            />
          </section>
          <section id="actividades" className="py-20 bg-white px-6">
            <h2 className="text-4xl font-bold text-center text-green-700">
              Actividades Educativas
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mt-2">
              Talleres, juegos interactivos, rutas ecológicas y más actividades
              orientadas a todas las edades.
            </p>
            <div className="grid md:grid-cols-3 gap-10 mt-14 max-w-6xl mx-auto">
              <article className="bg-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer">
                <img
                  src="/src/assets/img/talleres_reciclaje.jpg"
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700">
                    Talleres de Reciclaje
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Actividades prácticas para aprender a separar materiales y
                    reutilizar residuos.
                  </p>
                </div>
              </article>
              <article className="bg-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer">
                <img
                  src="/src/assets/img/rutinas_eco_urbanas.jpeg"
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700">
                    Rutinas Eco-Urbanas
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Rutas por la ciudad para conocer puntos de reciclaje y áreas
                    verdes certificadas.
                  </p>
                </div>
              </article>
              <article className="bg-gray-100 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer">
                <img
                  src="/src/assets/img/jornadas_niños.png"
                  alt=""
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-700">
                    Jornadas para Niños
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Juegos, dinámicas y concursos educativos que fomentan
                    hábitos responsables.
                  </p>
                </div>
              </article>
            </div>
          </section>
          <section className="py-24 px-6 bg-gradient-to-br from-green-600 to-emerald-800 text-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <div className="animate-fadeIn">
                <h2 className="text-4xl font-bold mb-4">Nuestro Impacto</h2>
                <p className="text-white/90 leading-relaxed">
                  Gracias a la participación activa de los ciudadanos, cada año
                  aumentamos el volumen de reciclaje y la concienciación
                  medioambiental. EcoRoute impulsa campañas que realmente
                  mejoran el entorno.
                </p>
                <ul className="mt-6 space-y-3 text-white/90">
                  <li>♻️ Más de 40 actividades educativas anuales</li>
                  <li>🌿 Participación creciente de jóvenes y familias</li>
                  <li>📍 Expansión de puntos de reciclaje en la ciudad</li>
                </ul>
              </div>
              <img
                src="/src/assets/img/impacto_ambiental.jpg"
                alt="Impacto ambiental"
                className="rounded-2xl shadow-xl hover:scale-105 transition-transform duration-500 hover:cursor-pointer"
              />
            </div>
          </section>
          <section className="py-20 px-6 text-center">
            <h2 className="text-4xl font-bold text-green-700">
              Únete al Cambio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mt-2">
              Pequeños gestos generan grandes resultados. Participa en nuestras
              actividades y sé parte del futuro sostenible de Peñaranda de
              Bracamonte.
            </p>
            <a
              href="/calendario-actividades"
              className="mt-8 inline-block bg-green-600 text-white px-10 py-3 rounded-xl shadow-lg text-lg font-semibold
             relative overflow-hidden transition-all hover:scale-105"
            >
              <span className="relative z-10">Conocer Próximos Eventos</span>
              <span className="absolute inset-0 bg-white/10 blur-xl animate-ping"></span>
            </a>
          </section>
        </div>
      </div>
    </Container>
  );
};