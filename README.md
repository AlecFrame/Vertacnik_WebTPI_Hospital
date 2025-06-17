# Vertacnik_WebTPI_Hospital

Proyecto de gestión hospitalaria para la autogestión del personal y pacientes.

## Tecnologías utilizadas
- Node.js
- Nodemon.js
- Express
- Express Session
- Sequelize (MySQL)
- Sequelize-cli (MySQL)
- Pug (motor de vistas)
- CSS
- Bcrypt

## Instalación y proceso para ejecutarlo al final
1. Clona el repositorio.
2. Instala dependencias:
3. npm install
4. Configura la base de datos en `.env` o en `config/config.json`. (por defecto si descargaste el proyecto ya estará configurado)
5. Inicia el servidor: (Ya deberia estar inicializado en el railway)
6. npm run start

## Funcionalidades principales
- Registro y gestión de pacientes
- Gestión de médicos y especialidades
- Admisión de pacientes
- Gestión de turnos médicos
- Administración de ofertas laborales y postulaciones

## Estructura del proyecto
- `/config`: Configuracion de la Base de Datos del Sequelize-cli
- `/controllers`: Lógica de negocio
- `/migrations`: Creado por el Sequelize-cli
- `/models`: Modelos Sequelize
- `/node_modules`: Creado por las dependencias
- `/public`: Archivos estáticos (JS, CSS)
- `/routes`: Rutas Express
- `/seeders`: Creado por el Sequelize-cli
- `/views`: Vistas Pug

---


