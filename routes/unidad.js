const express = require('express');
const router = express.Router();
const unidadController = require('../controllers/UnidadController');

// Listar todas las unidades
router.get('/listar', unidadController.listarUnidades);

// Obtener camas disponibles por unidad
router.get('/:unidadId/camas', unidadController.camasDisponiblesPorUnidad);

// Obtener estructura de la unidad (Ala, Habitacion, Cama)
router.get('/:unidadId/estructura', unidadController.estructuraUnidad);

module.exports = router;
