// Importa módulos del sistema y dependencias externas
import './env.js';
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import express from 'express'; 
import bodyParser from 'body-parser'; 
import cors from 'cors'; 

// Importación de las rutas personalizadas
import rutas from './router/userRoutes.js'; 
import rutasEventos from './router/eventRoutes.js' 
import rutasPuntosReciclaje from './router/recycleRoutes.js' 
import rutasRecompensas from './router/recompensasRoutes.js'
import rutasEvidencias from './router/evidenciasRoutes.js' 

// Obtiene la ruta completa del archivo actual y del directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define el puerto según entorno o usa 3000 como valor por defecto
const puertoBD = process.env.PORT || 3000;

// Crea la aplicación Express
const app = express();

// Middleware para interpretar cuerpos JSON en las peticiones
app.use(bodyParser.json());

// Habilita CORS para permitir conexiones desde el frontend
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type", "Authorization"], 
    credentials: true, 
  })
);

// Asigna las rutas principales de la API para los usuarios
app.use('/api/v1/ecoroute/usuarios', rutas);

// Asigna las rutas principales de la API para los eventos
app.use('/api/v1/ecoroute/eventos', rutasEventos)

// Asigna las rutas principales de la API para los puntos de recogida
app.use('/api/v1/ecoroute/puntos_reciclaje', rutasPuntosReciclaje)

// Asigna las rutas principales de la API para las recompensas
app.use('/api/v1/ecoroute/recompensas', rutasRecompensas)

// Asigna las rutas principales de la API para las evidencias
app.use('/api/v1/ecoroute/evidencias', rutasEvidencias)

// Middleware que maneja rutas inexistentes y devuelve un 404
app.use((req, res) => {
  res.status(404).json({ error: 'URL no válida: ruta no encontrada' });
});

// Middleware para capturar errores internos del servidor
app.use((err, req, res, next) => {
  console.error(err.stack); // Muestra el error en consola
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Inicia el servidor y muestra mensaje en consola
app.listen(puertoBD, () => {
  console.log(`Servidor ejecutándose en http://localhost:${puertoBD}`);
});