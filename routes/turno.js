const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/TurnoController');

router.get('/listar', turnoController.listarTurnos);
router.post('/crear', turnoController.crearTurno);

module.exports = router;