const express = require('express');
const router = express.Router();
const { Usuario, Rol, RolUsuario } = require('../models');

router.post('/login', async (req, res) => {
    const { dni, email, password } = req.body;

    try {
        // Verifica si el usuario existe con esos datos
        const usuario = await Usuario.findOne({
            where: { dni, email, contraseña: password },
            include: {
                model: Rol,
                through: { attributes: [] }
            }
        });

        if (!usuario) {
            return res.status(401).render('error', {
                title: 'Inicio de sesión fallido',
                message: 'Credenciales incorrectas'
            });
        }

        // Si se encuentra el usuario, redirige a su perfil
        console.log('Usuario autenticado:', usuario.nombre);
        console.log('Usuario autenticado, id:', usuario.id);
        console.log('Usuario autenticado, rol:', usuario.Rols.map(rol => rol.tipo));
        // Aquí podrías guardar el usuario en la sesión
        req.session.userId = usuario.id; // Guarda el ID del usuario en la sesión
        req.session.userRoles = usuario.Rols.map(rol => rol.tipo); // Guarda los roles del usuario en la sesión

        res.redirect(`/profile`);
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).render('error', {
            title: 'Error del servidor',
            message: 'Ocurrió un error al intentar iniciar sesión'
        });
    }
});

module.exports = router;