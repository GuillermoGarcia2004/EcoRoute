# 🌍 EcoRoute API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)

> API RESTful del proyecto **EcoRoute**, una plataforma web dedicada a concienciar sobre el reciclaje y promover hábitos sostenibles en la sociedad. 🌱

---

## 🚀 Descripción

**EcoRoute API** es el corazón de la aplicación EcoRoute.  
Proporciona los datos y funcionalidades necesarias para la gestión de:
- ♻️ Puntos de reciclaje  
- 🗑️ Tipos de residuos  
- 👥 Usuarios y sus acciones ecológicas  
- 📊 Estadísticas medioambientales  

Construida con **Node.js** y **Express**, esta API ofrece una base sólida, rápida y escalable para impulsar la conciencia medioambiental desde la tecnología.

---

## 🧩 Tecnologías principales

| Tecnología | Uso |
|-------------|-----|
| **Node.js** | Entorno de ejecución principal |
| **Express.js** | Framework para crear la API REST |
| **dotenv** | Configuración segura de variables de entorno |
| **Cors / Morgan** | Gestión de cabeceras y registro de peticiones |

---

## 📁 Estructura del proyecto

```
api_ecoroute/
├── node_modules/
├── v1/
│   ├── config/
│   |   ├── database/
|   |   |   └── ecoroute.sql
│   │   └── db.js
│   ├── controllers/
|   |   ├── emailController.js
|   |   ├── eventController.js
|   |   ├── evidenciasController.js
|   |   ├── recompensasController.js
|   |   ├── recycleController.js
│   │   └── userController.js
│   ├── models/
|   |   ├── eventModel.js
|   |   ├── evidenciasModel.js
|   |   ├── recompensasModel.js
|   |   ├── recycleModel.js
│   │   └── userModel.js
│   ├── router/
|   |   ├── eventRoutes.js
|   |   ├── evidenciasRoutes.js
|   |   ├── recompensasRoutes.js
|   |   ├── recycleRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── base.js
│   ├── env.js
│   └── index.js
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```

---

## ⚙️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/GuillermoGarcia2004/api-proyecto-final-DAW
cd ecoroute-api
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar variables de entorno
Crea un archivo `.env` basado en `.env.example`:

```env
DB_HOST=TU_HOST
DB_USER=TU_USUARIO
DB_PASSWORD=TU_PASSWORD
DB_NAME=NOMBRE_BASE_DE_DATOS
PORT=PUERTO
CLAVE_CORREO=TU_CLAVE
CORREO=TU_CORREO
```

### 4️⃣ Iniciar el servidor
```bash
npm run dev
```

---

## 🧠 Objetivo del proyecto

Promover la **concienciación ambiental** mediante una herramienta digital moderna, educativa y visual, que permita:
- Identificar puntos de reciclaje cercanos.  
- Aprender a separar correctamente los residuos.  
- Medir el impacto ecológico de cada acción. 🌿  

---

## 🤝 Contribuciones

¿Tienes ideas para mejorar EcoRoute?  
¡Las contribuciones son bienvenidas!  
1. Haz un fork del proyecto  
2. Crea una rama (`feature/nueva-funcionalidad`)  
3. Envía un Pull Request  

---

## 📜 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

---

## 👨‍💻 Autor y créditos académicos

**Autor:** Guillermo García Gómez
**Instituto:** IES Venancio Blanco  
**Ciclo Formativo:** Grado Superior en Desarrollo de Aplicaciones Web (DAW)  
**Módulo:** Proyecto Final de Desarrollo de Aplicaciones Web  
**Año académico:** 2025  

---

### 💚 Hecho con Node.js para un planeta más limpio 🌎
