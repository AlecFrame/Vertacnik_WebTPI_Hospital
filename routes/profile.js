const express = require('express');
const router = express.Router();
const { Usuario, Rol } = require('../models');

router.get('/', async (req, res) => {
    if (!req.session || !req.session.userId) {
        return res.status(401).render('error', {
            title: 'Acceso no autorizado',
            message: 'Debes iniciar sesión para acceder a esta página'
        });
    }

    try {
        console.log('ID de usuario en sesión:', req.session.userId);

        const usuario = await Usuario.findByPk(req.session.userId, {
            include: {
                model: Rol,
                through: { attributes: [] }
            }
        });

        if (!usuario) {
            return res.status(404).render('error', {
                title: 'Usuario no encontrado',
                message: 'No se pudo encontrar al usuario con ese ID'
            });
        }

        console.log('Usuario autenticado:', usuario.nombre);
        console.log('Usuario autenticado, id:', usuario.id);
        console.log('Usuario autenticado, rol:', usuario.Rols.map(rol => rol.tipo));

        res.render('profile', {
            title: 'Perfil de Usuario',
            usuario: usuario,
            roles: usuario.Rols.map(rol => rol.tipo)
        });

    } catch (error) {
        console.error('Error al cargar el perfil:', error);
        res.status(500).render('error', {
            title: 'Error del servidor',
            message: 'Ocurrió un error al intentar cargar el perfil'
        });
    }
});

module.exports = router;