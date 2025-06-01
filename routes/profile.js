const express = require('express');
const router = express.Router();
const { Usuario, Rol, RolUsuario } = require('../models');

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).render('error', {
            title: 'Acceso no autorizado',
            message: 'Debes iniciar sesión para acceder a esta página'
        });
    }

    const usuario = Usuario.findByPk(req.session.userId, {
        include: {
            model: Rol,
            through: { attributes: [] }
        }
    });
    
    if (usuario) {
        res.render('profile', {
            title: 'Perfil de Usuario',
            usuario: usuario,
            roles: usuario.Roles.map(rol => rol.nombre).join(', ')
        });
    }
});

module.exports = router;