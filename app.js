const express = require('express');
const path = require('path');
const app = express();
const sequelize = require('./models/db');

// Importar las rutas
const indexRoutes = require('./routes/index');

// Configuracion del motor de plantillas - PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware para obtener datos del formulario
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas
app.use('/', indexRoutes);

// Inicio del servidor
const PORT = process.env.PORT || 7200;
sequelize.sync({alter: true})
    .then(() => {
        console.log('Modelos sincronizados');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al sincronizar modelos:', err);
    });