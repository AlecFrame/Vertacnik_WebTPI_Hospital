const express = require('express');
const router = express.Router();
const controller = require('../controllers/PostulacionPublicaController');

router.get('/trabaja', controller.mostrar);
router.post('/postular', controller.postular);

module.exports = router;