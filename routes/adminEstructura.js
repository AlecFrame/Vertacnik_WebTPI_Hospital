const express = require('express');
const router = express.Router();
const EstructuraController = require('../controllers/EstructuraController');

router.get('/estructura/:seccion', EstructuraController.cargarSeccion);

module.exports = router;