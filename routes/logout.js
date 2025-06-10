const express = require('express');
const router = express.Router();

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
      return res.status(500).send('Error al cerrar sesión');
    }

    res.clearCookie('connect.sid'); // Borra cookie de sesión
    res.redirect('/'); // o redirigí a /login o donde quieras
  });
});

module.exports = router;