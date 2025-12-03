import { Container } from "../layouts/Container";

export const InformacionReciclaje = () => {
  return (
    <Container>
      <div className="w-full bg-gradient-to-b from-green-50 to-white py-20 px-6 md:px-12 lg:px-24">
        <section className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-6 animate-fade-in">
            Información sobre el Reciclaje
          </h1>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in delay-100">
            En <span className="font-semibold text-green-700">Ecoroute</span>,
            junto al
            <span className="font-semibold text-green-700">
              {" "}
              Ayuntamiento de Peñaranda de Bracamonte
            </span>
            , promovemos actividades y recursos para concienciar a la población
            sobre la importancia de las buenas prácticas de reciclaje y la
            sostenibilidad.
          </p>
        </section>

        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:cursor-pointer">
            <img
              src="/src/assets/img/reciclar.jpg"
              alt="Reciclaje"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              ¿Por qué reciclar?
            </h3>
            <p className="text-gray-600">
              El reciclaje reduce la contaminación, ahorra energía y protege los
              recursos naturales, contribuyendo a un futuro más sostenible para
              todos.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:cursor-pointer">
            <img
              src="/src/assets/img/contenedores.jpg"
              alt="Contenedores de reciclaje"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Tipos de contenedores
            </h3>
            <p className="text-gray-600">
              Aprende a separar correctamente los residuos: papel, vidrio,
              envases, orgánico y más. Cada residuo tiene un sitio específico.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:cursor-pointer">
            <img
              src="/src/assets/img/educacion_reciclaje.jpg"
              alt="Actividades"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Actividades educativas
            </h3>
            <p className="text-gray-600">
              Organizamos talleres, juegos y eventos dirigidos a niños, jóvenes
              y adultos para promover hábitos sostenibles en la comunidad.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1560264280-88b68371db39?auto=format&fit=crop&w=800&q=60"
              alt="Impacto ambiental"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Impacto ambiental
            </h3>
            <p className="text-gray-600">
              Cada residuo que reciclamos reduce nuestra huella ecológica y
              ayuda a combatir el calentamiento global y la acumulación de
              basura.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1 hover:cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=800&q=60"
              alt="Economía circular"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Economía circular
            </h3>
            <p className="text-gray-600">
              Impulsamos un sistema donde los productos se reutilizan, reparan o
              reciclan, reduciendo los residuos al mínimo.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <img
              src="/src/assets/img/ciudadania.jpg"
              alt="Participación ciudadana"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Participación ciudadana
            </h3>
            <p className="text-gray-600">
              La implicación de cada vecino es fundamental. Pequeñas acciones
              diarias generan un gran cambio colectivo.
            </p>
          </div>
        </section>

        <div className="text-center mt-20 animate-fade-in">
          <a
            href="/calendario-actividades"
            className="px-8 py-4 bg-green-700 text-white font-semibold rounded-xl shadow-lg hover:bg-green-800 transition-colors duration-300"
          >
            Descubre nuestras actividades
          </a>
        </div>
      </div>
    </Container>
  );
};