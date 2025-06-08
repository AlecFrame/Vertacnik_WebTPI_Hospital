const express = require('express');
const router = express.Router();
const PostulacionController = require('../controllers/PostulacionController');

router.get('/postulaciones', PostulacionController.listar);
router.put('/postulaciones/:id/aceptar', PostulacionController.aceptar);
router.put('/postulaciones/:id/rechazar', PostulacionController.rechazar);

module.exports = router;