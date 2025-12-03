import { Container } from "../layouts/Container";

export const PreguntasFrecuentes = () => {
  return (
    <Container>
      <main className="w-full min-h-screen bg-gray-50 px-6 py-14 md:px-16 lg:px-28">
        {/* Título principal */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 tracking-tight drop-shadow-sm animate-fadeIn">
            Preguntas Frecuentes
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto animate-fadeIn delay-200">
            Encuentra respuestas a las dudas más comunes sobre reciclaje y cómo participar en las actividades de Ecoroute.
          </p>
        </section>

        {/* Preguntas frecuentes */}
        <section className="space-y-6 animate-fadeIn delay-300">
          <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <h2 className="text-xl font-semibold text-green-700 mb-2">¿Cómo puedo participar en las campañas de reciclaje?</h2>
            <p className="text-gray-600">Puedes unirte a nuestras actividades visitando los puntos de información o inscribiéndote online a través de nuestra página web.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <h2 className="text-xl font-semibold text-green-700 mb-2">¿Qué materiales puedo reciclar?</h2>
            <p className="text-gray-600">Se pueden reciclar plásticos, papel, cartón, vidrio y metales. Cada material tiene un contenedor específico en nuestros puntos de reciclaje.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <h2 className="text-xl font-semibold text-green-700 mb-2">¿Dónde están ubicados los puntos de reciclaje?</h2>
            <p className="text-gray-600">Los puntos están distribuidos estratégicamente por Peñaranda de Bracamonte. Puedes consultar un mapa interactivo en nuestra sección de Puntos de Reciclaje.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
            <h2 className="text-xl font-semibold text-green-700 mb-2">¿Hay recompensas por reciclar?</h2>
            <p className="text-gray-600">Sí, al participar en nuestras actividades y llevar materiales a los puntos de reciclaje, acumulas puntos que puedes canjear por recompensas en nuestro catálogo.</p>
          </div>
        </section>

        {/* Animaciones personalizadas */}
        <style>{` 
          .animate-fadeIn { opacity: 0; animation: fadeIn 0.8s forwards; }
          .delay-200 { animation-delay: 0.2s; }
          .delay-300 { animation-delay: 0.3s; }
          @keyframes fadeIn { to { opacity: 1; } }
        `}</style>
      </main>
    </Container>
  );
}