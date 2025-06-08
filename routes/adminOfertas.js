const express = require('express');
const router = express.Router();
const OfertaController = require('../controllers/OfertaController');

router.get('/ofertas', OfertaController.listar);
router.put('/ofertas/:id/desactivar', OfertaController.darDeBaja);
router.post('/ofertas', OfertaController.crear);

module.exports = router;