const express = require('express');
const router = express.Router();
const admisionController = require('../controllers/AdmisionController');

// Buscar turno cercano por DNI (si es cita)
router.post('/buscar-turno', admisionController.buscarTurnoCercano);

// Crear una nueva admisión
router.post('/crear', admisionController.crearAdmision);

// Listar las admisiones hechas por el usuario logueado (recepcionista)
router.get('/mis-admisiones', admisionController.listarAdmisionesPorUsuario);

module.exports = router;
