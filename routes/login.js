const express = require('express');
const router = express.Router();
const { Usuario, Rol, RolUsuario } = require('../models');

router.post('/login', async (req, res) => {
  const { dni, email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { dni, email },
      include: {
        model: Rol,
        through: { attributes: [] }
      }
    });

    const bcrypt = require('bcrypt');

    if (!usuario || !(await bcrypt.compare(password, usuario.contraseña))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    }


    req.session.userId = usuario.id;
    req.session.userRoles = usuario.Rols.map(rol => rol.tipo);

    res.status(200).json({ redirect: '/profile' });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error del servidor al iniciar sesión' });
  }
});

module.exports = router;