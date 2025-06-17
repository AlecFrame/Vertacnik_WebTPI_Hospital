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

## EndPoint de inicio para admitir pacientes por parte del recepcionista
- https://tusitio.railway.app/profile (Mi estructura es un poco mas compleja, profile es el espacio de acciones que puede hacer un usuario en el sistema dependiendo del rol que tenga, tendra mas o menos items en la barra lateral izquierda, entonces no puedes ir directamente a esta ruta porque necesitas autentificarte como recepcionista en el sistema para que te permita hacer una admision)
- Para ingresar como recepcionista registre uno al sistema, inicias secion en la pagina principal:
        dni: 46260391, 
        email: walteravertacnik@gmail.com, 
        contraseña: temporal123
- Una vez ingresado te mandara a profile como recepcionista y aqui seleccionas el item de admitir Paciente y te saldra el formulario para admitir un paciente
- Para la admision me inspire en la estructura de un compañero, no me acuerdo quien, este se separa en 3 fases, en la primera ingresas "tipo de ingreso" y "dni", en la segunda ingresas los datos del paciente si no existe, si existe entonces se completan los campos y das un motivo y pasa a la fase 3 donde asignas una unidad y una cama disponible

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


