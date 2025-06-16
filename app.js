const express = require('express');
const path = require('path');
const app = express();
const db = require('./models');
const session = require('express-session');

// Importar las rutas
const indexRoutes = require('./routes/index');
const profileRoutes = require('./routes/profile');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const adminOfertasRoutes = require('./routes/adminOfertas');
const adminPostulaciones = require('./routes/adminPostulaciones');
const adminUsuarios = require('./routes/adminUsuarios');
const publicPostulaciones = require('./routes/publicPostulaciones');
const adminEstructura = require('./routes/adminEstructura');
const admisionRoutes = require('./routes/admision');
const pacienteRoutes = require('./routes/paciente');
const unidadRoutes = require('./routes/unidad');
const { Usuario, Rol, RolUsuario } = require('./models');

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

// Middleware para manejar la autenticación
app.use(async (req, res, next) => {
    res.locals.isAuthenticated = false;
    res.locals.usuario = null;

    if (req.session.userId) {
        try {
            const usuario = await Usuario.findByPk(req.session.userId, {
                include: {
                    model: Rol,
                    through: { attributes: [] }
                }
            });

            if (usuario) {
                res.locals.isAuthenticated = true;
                res.locals.usuario = usuario;
                res.locals.roles = usuario.Rols.map(r => r.tipo);
            }
        } catch (error) {
            console.error('Error al cargar usuario en middleware global:', error);
        }
    }

    next();
});


// Middleware para manejar variables globales
app.use(async (req, res, next) => {
    res.locals.hospital = null;

    try {
        const hospital = await db.Hospital.findOne({
            where: { id: 1 } // Solo hay un hospital en la base de datos
        });

        if (hospital) {
            res.locals.hospital = hospital;
        }
    } catch (error) {
        console.error('Error al cargar hospital en middleware global:', error);
    }

    next();
});


// Rutas
app.use('/', indexRoutes);
app.use('/profile', profileRoutes);
app.post('/login', loginRoutes); // Middleware para manejar la autenticación
app.get('/logout', logoutRoutes); // Middleware para manejar el cierre de sesión
app.use('/admin', adminOfertasRoutes);
app.use('/admin', adminPostulaciones);
app.use('/admin', adminUsuarios);
app.use('/admin', adminEstructura);
app.use('/admision', admisionRoutes);
app.use('/paciente', pacienteRoutes);
app.use('/unidad', unidadRoutes);
app.use('/', publicPostulaciones);

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