-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2025 a las 10:15:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ecoroute`
--
CREATE DATABASE IF NOT EXISTS `ecoroute` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `ecoroute`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `eventos`
--

CREATE TABLE `eventos` (
  `id_evento` int(3) NOT NULL,
  `id_usuario` int(3) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `fecha` date NOT NULL,
  `lugar` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `eventos`
--

INSERT INTO `eventos` (`id_evento`, `id_usuario`, `nombre`, `fecha`, `lugar`) VALUES
(1, 1, 'Ruleta del Reciclaje en Plaza Nueva', '2025-11-05', 'Plaza Nueva'),
(2, 1, 'Taller de reutilización de objetos', '2025-11-10', 'Parque de La Huerta'),
(3, 1, 'Jornada de recogida de residuos ecológicos', '2025-11-15', 'Centro de Desarrollo Sociocultural'),
(4, 1, 'Concienciación sobre separación de residuos', '2025-11-20', 'Biblioteca Municipal'),
(5, 1, 'Concurso de ideas sostenibles', '2025-11-25', 'Ayuntamiento de Peñaranda'),
(6, 1, 'Feria ecológica y de proximidad', '2025-12-02', 'Plaza Nueva'),
(7, 1, 'Taller de compostaje doméstico', '2025-12-09', 'Centro de Desarrollo Sociocultural'),
(8, 1, 'Exhibición de arte reciclado', '2025-12-12', 'Museo del Arte de Peñaranda'),
(9, 1, 'Charla sobre reciclaje en escuelas', '2025-12-15', 'Colegio Unamuno'),
(10, 1, 'Campaña de limpieza y reciclaje urbano', '2025-12-20', 'Varios puntos de la ciudad'),
(11, 1, 'El vidrio y yo', '2025-12-25', 'Plaza Nueva'),
(12, 1, 'Festival de cine +Planeta', '2025-12-30', 'Plaza Nueva');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evidencias`
--

CREATE TABLE `evidencias` (
  `id_evidencia` int(3) NOT NULL,
  `id_usuario` int(3) NOT NULL,
  `tipo` varchar(200) DEFAULT NULL,
  `contenido` varchar(500) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntos_recogida`
--

CREATE TABLE `puntos_recogida` (
  `id` int(3) NOT NULL,
  `id_usuario` int(3) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `direccion_usuario` varchar(500) NOT NULL,
  `direccion_administrador` varchar(500) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `puntos_recogida`
--

INSERT INTO `puntos_recogida` (`id`, `id_usuario`, `nombre`, `descripcion`, `direccion_usuario`, `direccion_administrador`, `fecha_creacion`) VALUES
(1, 1, 'Punto Limpio de Peñaranda de Bracamonte', 'El Punto Limpio de Peñaranda de Bracamonte es una instalación municipal destinada a la recogida selectiva de residuos urbanos que no deben depositarse en los contenedores comunes.', 'Calle de los Herreros, 14, Peñaranda de Bracamonte', 'Calle de los Herreros, 14, Peñaranda de Bracamonte', '2025-11-28 22:40:07'),
(2, 1, 'Contenedor de reciclaje de aceite usado', 'Estos contenedores permiten depositar aceite de cocina usado, evitando contaminación de aguas, mediante un convenio con la entidad Porsiete. Para enseres voluminosos existe también recogida a domicilio gratuita los 2º y 4º viernes de mes.', 'Calle Antonio Salazar, Peñaranda de Bracamonte', 'Calle Antonio Salazar, Peñaranda de Bracamonte', '2025-11-28 22:44:57'),
(3, 1, 'Contenedor de reciclaje de aceite usado', 'Estos contenedores permiten depositar aceite de cocina usado, evitando contaminación de aguas, mediante un convenio con la entidad Porsiete. Para enseres voluminosos existe también recogida a domicilio gratuita los 2º y 4º viernes de mes.', 'Cordel de Merinas, Peñaranda de Bracamonte', 'Cordel de Merinas, Peñaranda de Bracamonte', '2025-11-28 22:46:07');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recompensas`
--

CREATE TABLE `recompensas` (
  `id` int(3) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `valor` int(4) NOT NULL,
  `fecha_creacion` datetime NOT NULL DEFAULT current_timestamp(),
  `codigo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `recompensas`
--

INSERT INTO `recompensas` (`id`, `nombre`, `descripcion`, `valor`, `fecha_creacion`, `codigo`) VALUES
(1, 'Cheque 10€', 'Cheque regalo para comercio local', 100, '2025-11-29 13:02:58', 'eu[G[S[=p&1c#j}W'),
(2, 'Descuento 15%', '15% en cualquier tienda adherida', 150, '2025-11-29 13:02:58', 'Cn8BF85(&;Ay3$dE'),
(3, 'Café Gratis', 'Un café en cafeterías participantes', 50, '2025-11-29 13:02:58', '2dhA,FtcwBJ-X5xC'),
(4, 'Bollo Local', 'Panadería: bollo o croissant gratis', 40, '2025-11-29 13:02:58', 'mQ_n@B)Kgi/z&rNa'),
(5, 'Ticket Cine', 'Entrada a cine municipal con descuento', 120, '2025-11-29 13:02:58', 'WUe4bLNj;n;n?vr8'),
(6, 'Cesta Básica', 'Productos esenciales de frutería/carnicería', 200, '2025-11-29 13:02:58', '_LTnen/)4k/%:tBG'),
(7, 'Descuento 20%', '20% en supermercados locales', 180, '2025-11-29 13:02:58', '$x4W)2*w,?VpNzcj'),
(8, 'Cita Peluquería', 'Lavado y corte en peluquerías', 90, '2025-11-29 13:02:58', '+yM4ngJ(E7Kc]QEK'),
(9, 'Bicicleta Hora', 'Alquiler bici municipal 1 hora gratis', 70, '2025-11-29 13:02:58', '}j4x}p@R%LqzD14j'),
(10, 'Taller Gratuito', 'Taller infantil en centro cultural', 110, '2025-11-29 13:02:58', '#FZJp)2cwE=Ny?y0'),
(11, 'Descuento Gimnasio', 'Mes gratis en gimnasio local', 250, '2025-11-29 13:02:58', ':-]tVEB=ykkTzS,+'),
(12, 'Cena Local', 'Menú para dos en restaurante', 300, '2025-11-29 13:02:58', 'b_Vcaz65;;{8#193'),
(13, 'Libro Librería', 'Libro infantil en librería local', 80, '2025-11-29 13:02:58', 'g-t2{!=HQu30=X,h'),
(14, 'Reparación Gratis', 'Arreglo ropa en sastrería', 60, '2025-11-29 13:02:58', 'cWM5M{%)vdL}E8N5'),
(15, 'Pack Bebé', 'Productos higiene en farmacia', 140, '2025-11-29 13:02:58', 'QLcB$#B@c_5ZQD-p'),
(16, 'Descuento 25%', '25% en ferretería local', 160, '2025-11-29 13:02:58', ',eF5TLPSNVVQn4Q/'),
(17, 'Clase Deportes', 'Clase trial en polideportivo', 100, '2025-11-29 13:02:58', '3DwTNfp)UbcB=nz!'),
(18, 'Cesta Gourmet', 'Productos gourmet locales', 220, '2025-11-29 13:02:58', 'Kr&EGT.t!GqY*wZW'),
(19, 'Visita Guiada', 'Tour histórico por la localidad', 130, '2025-11-29 13:02:58', '8udtmcgiVZ3,9c3E'),
(20, 'Bono Transporte', '10 viajes bus municipal', 190, '2025-11-29 13:02:58', '8udtmcgiVZ3,9cyu'),
(21, 'Noche Hotel', 'Estancia en albergue rural local', 400, '2025-11-29 13:02:58', ',eF5TLPSNVVQnd31'),
(22, 'Masaje para dos personas', 'Masaje para dos personas válido en cualquier fisioterapeuta de la ciudad', 250, '2025-12-01 22:13:00', 'RgbJuKxx2VtOxETq2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(3) NOT NULL,
  `email` varchar(320) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `puntos` int(11) DEFAULT 100,
  `telefono` int(9) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `rol` enum('Usuario','Administrador') DEFAULT 'Usuario',
  `estado` enum('Activo','Inactivo') DEFAULT 'Inactivo',
  `pendiente_baja` enum('Si','No') NOT NULL DEFAULT 'No',
  `token` varchar(255) DEFAULT NULL,
  `token_expira_a` datetime DEFAULT current_timestamp(),
  `perfil` varchar(50) DEFAULT 'user.png',
  `fecha_creacion` datetime DEFAULT current_timestamp(),
  `fecha_solicitud_baja` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `nombre`, `apellidos`, `puntos`, `telefono`, `hash`, `rol`, `estado`, `pendiente_baja`, `token`, `token_expira_a`, `perfil`, `fecha_creacion`, `fecha_solicitud_baja`) VALUES
(1, 'admin@ecoroute.com', 'Guillermo', 'García Gómez', 0, 923183441, '$2a$12$G/Ov4PNfpWLGZUrmbWitn.wIAPqkwGSCKuppg5yrfn/zYOVRDVRFu', 'Administrador', 'Activo', 'No', NULL, NULL, 'admin.png', '2025-11-28 17:31:10', NULL),
(2, 'user1@ecoroute.com', 'Rosa', 'López Hernández', 100, 923183442, '$2a$12$eE9DX6VVY7Yd5UeyW1Sy6u8T8dceb/TAnyu2eDCforL.7kkK7K2SW', 'Usuario', 'Activo', 'No', NULL, NULL, 'user.png', '2025-11-28 17:33:51', NULL),
(3, 'user3@ecoroute.com', 'Antonio', 'Pérez Gómez', 100, 912345678, '$2a$12$yFrRDEHASNAkCyOAlmRcEucsdgt9UEiUXDl8oB0oRcoVNv0GGpa/K', 'Usuario', 'Activo', 'No', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(4, 'user4@ecoroute.com', 'Fernando', 'López Martínez', 100, 923456789, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Inactivo', 'No', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(5, 'user5@ecoroute.com', 'José', 'García Sánchez', 100, 934567890, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Activo', 'No', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(6, 'user6@ecoroute.com', 'Francisco', 'Ruiz Fernández', 100, 945678901, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Inactivo', 'No', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(7, 'user7@ecoroute.com', 'David', 'Santos Díaz', 100, 956789012, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Activo', 'Si', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(8, 'user8@ecoroute.com', 'Javier', 'Reyes Castro', 100, 967890123, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Inactivo', 'Si', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(9, 'user9@ecoroute.com', 'Juan', 'Domínguez Torres', 100, 978901234, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Activo', 'Si', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(10, 'user10@ecoroute.com', 'Alejandro', 'Vega Navarro', 100, 989012345, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Inactivo', 'Si', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(11, 'user11@ecoroute.com', 'Pablo', 'Ramos León', 100, 990123456, '$2y$12$w8UGjI6qvoXIjzpYQd1LueRSzkkMdG3DN5L5V7psU9yTXI8f5z5Ga', 'Usuario', 'Activo', 'Si', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL),
(12, 'user12@ecoroute.com', 'Mario', 'Castro Molina', 100, 991234567, '$2a$12$ux5FRvuJA8tVttbSRLw0j.KvlF0JJzDKB8/3XK6rFFPuHnn0ZuFb2', 'Usuario', 'Inactivo', 'Si', NULL, NULL, 'user.png', '2025-11-28 17:48:47', NULL);

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `before_update_usuario_estado` BEFORE UPDATE ON `usuarios` FOR EACH ROW BEGIN
  IF NEW.estado = 'Activo' THEN
    SET NEW.token = NULL;
    SET NEW.token_expira_a = NULL;
  END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `trg_token_expira_a` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
  IF NEW.token_expira_a IS NULL OR NEW.token_expira_a = CURRENT_TIMESTAMP THEN
    SET NEW.token_expira_a = DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 DAY);
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_recompensas`
--

CREATE TABLE `usuarios_recompensas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(3) NOT NULL,
  `id_recompensa` int(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_recompensas_canjeadas`
--

CREATE TABLE `usuarios_recompensas_canjeadas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_recompensa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD PRIMARY KEY (`id_evento`),
  ADD KEY `fk_eventos_usuarios` (`id_usuario`);

--
-- Indices de la tabla `evidencias`
--
ALTER TABLE `evidencias`
  ADD PRIMARY KEY (`id_evidencia`),
  ADD KEY `fk_evidencias_usuarios` (`id_usuario`);

--
-- Indices de la tabla `puntos_recogida`
--
ALTER TABLE `puntos_recogida`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_puntos_usuarios` (`id_usuario`);

--
-- Indices de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `UQ_usuarios_telefono` (`telefono`);

--
-- Indices de la tabla `usuarios_recompensas`
--
ALTER TABLE `usuarios_recompensas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuarios_recompensas_usuarios` (`id_usuario`),
  ADD KEY `fk_usuarios_recompensas_recompensas` (`id_recompensa`);

--
-- Indices de la tabla `usuarios_recompensas_canjeadas`
--
ALTER TABLE `usuarios_recompensas_canjeadas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_urc_usuarios` (`id_usuario`),
  ADD KEY `fk_urc_recompensas` (`id_recompensa`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `eventos`
--
ALTER TABLE `eventos`
  MODIFY `id_evento` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `evidencias`
--
ALTER TABLE `evidencias`
  MODIFY `id_evidencia` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=101;

--
-- AUTO_INCREMENT de la tabla `puntos_recogida`
--
ALTER TABLE `puntos_recogida`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `recompensas`
--
ALTER TABLE `recompensas`
  MODIFY `id` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT de la tabla `usuarios_recompensas`
--
ALTER TABLE `usuarios_recompensas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `usuarios_recompensas_canjeadas`
--
ALTER TABLE `usuarios_recompensas_canjeadas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `eventos`
--
ALTER TABLE `eventos`
  ADD CONSTRAINT `fk_eventos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `evidencias`
--
ALTER TABLE `evidencias`
  ADD CONSTRAINT `fk_evidencias_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntos_recogida`
--
ALTER TABLE `puntos_recogida`
  ADD CONSTRAINT `fk_puntos_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_recompensas`
--
ALTER TABLE `usuarios_recompensas`
  ADD CONSTRAINT `fk_usuarios_recompensas_recompensas` FOREIGN KEY (`id_recompensa`) REFERENCES `recompensas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_usuarios_recompensas_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_recompensas_canjeadas`
--
ALTER TABLE `usuarios_recompensas_canjeadas`
  ADD CONSTRAINT `fk_urc_recompensas` FOREIGN KEY (`id_recompensa`) REFERENCES `recompensas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_urc_usuarios` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
