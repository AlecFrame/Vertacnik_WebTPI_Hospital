const { Oferta, Rol, Postulacion } = require('../models');
const path = require('path');
const fs = require('fs');

const mostrar = async (req, res) => {
  const ofertas = await Oferta.findAll({
    where: { activo: true },
    include: { model: Rol, as: 'rol' }
  });

  res.render('trabaja', { title: 'Trabaja con Nosotros', ofertas });
};

const postular = async (req, res) => {
  try {
    const { oferta_id, dni, nombre, apellido, email, telefono, fecha_nacimiento, url_cv, matricula } = req.body;

    if (!url_cv || !url_cv.startsWith('http')) {
      return res.status(400).send('Debes ingresar un enlace válido al CV.');
    }

    // Prevenir postulaciones duplicadas
    const existente = await Postulacion.findOne({ where: { dni, oferta_id } });
    if (existente) {
      return res.status(400).send('Ya te has postulado a esta oferta.');
    }

    await Postulacion.create({
      oferta_id,
      dni,
      nombre,
      apellido,
      email,
      telefono,
      fecha_nacimiento,
      url_cv,
      matricula
    });

    const ofertas = await Oferta.findAll({
      where: { activo: true },
      include: { model: Rol, as: 'rol' }
    });

    res.render('trabaja', { title: 'Trabaja con Nosotros', ofertas, success: true });
  } catch (err) {
    console.error('Error al guardar postulación:', err);
    res.status(500).send('Error al guardar postulación.');
  }
};

module.exports = { mostrar, postular };
