const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/MedicoController');

// Rutas para Medico
router.get('/listar', medicoController.listarMedicos);

module.exports = router;