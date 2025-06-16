const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/PacienteController');

// Buscar paciente por DNI
router.post('/buscar', pacienteController.buscarPacientePorDni);

// Crear nuevo paciente y usuario
router.post('/crear', pacienteController.crearPacienteConUsuario);

// Crear nuevo paciente y usuario
router.post('/guardar', pacienteController.guardar);

// Obtener dni temporal en caso de paciente no identificado
router.get('/generar-dni-temporal', pacienteController.generarDniTemporal);

module.exports = router;