const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/PacienteController');

// Buscar paciente por DNI
router.post('/buscar', pacienteController.buscarPacientePorDni);

// Crear nuevo paciente
router.post('/crear', pacienteController.crear);

// Crear nuevo paciente y usuario
router.post('/guardar', pacienteController.guardar);

// Obtener dni temporal en caso de paciente no identificado
router.get('/generar-dni-temporal', pacienteController.generarDniTemporal);

// Listar todos los pacientes
router.get('/listar', pacienteController.listarPacientes);

module.exports = router;