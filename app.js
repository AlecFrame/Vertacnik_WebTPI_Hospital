const express = require('express');
const path = require('path');
const app = express();
const db = require('./models');
const session = require('express-session');

// Importar las rutas
const indexRoutes = require('./routes/index');
const profileRoutes = require('./routes/profile');
const loginRoutes = require('./routes/login');
// const { Usuario, Rol, RolUsuario } = require('./models'); // Descomentar si se necesita para la autenticación
const { title } = require('process');

// Configuracion del motor de plantillas - PUG
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Configuración de la sesión
app.use(session({
  secret: 'Algo', // usa una clave real en producción
  resave: false,
  saveUninitialized: false
}));

// Middleware para poder cargar las imagenes u otros localmente y obtener datos de formulario
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Middleware para pasar variables a todas las vistas
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

// Rutas
app.use('/', indexRoutes);
app.use('/profile', profileRoutes);
app.post('/login', loginRoutes); // Middleware para manejar la autenticación

// Error 404
app.use((req, res) => {
    res.status(404).render('error', {
        title: 'Página no encontrada',
        message: 'La página que estás buscando no existe'
    });
});

// Manejo de errores
app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).render('error', {
        title: 'Error interno del servidor',
        message: 'Ha ocurrido un error en el servidor'
    });
});

// Inicio del servidor
const PORT = process.env.PORT || 7200;
db.sequelize.sync({alter: true})
    .then(() => {
        console.log('Modelos sincronizados');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error al sincronizar modelos:', err);
    });