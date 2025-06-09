const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/usuarios', UsuarioController.listarUsuarios);
router.put('/usuarios/:id/estado', UsuarioController.cambiarEstado);
router.put('/usuarios/:id/rol', UsuarioController.cambiarRol);
router.put('/usuarios/:id/reset-password', UsuarioController.reiniciarContraseña);

module.exports = router;
