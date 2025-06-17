const express = require('express');
const router = express.Router();
const EspecialidadController = require('../controllers/especialidadController');

// Rutas para manejar las especialidades
router.get('/listar', EspecialidadController.listarEspecialidades);

module.exports = router;