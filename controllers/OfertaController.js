const { Oferta, Rol, Postulacion } = require('../models');
const { Op } = require('sequelize');

const darDeBajaOfertasDescontinuadas = async () => {
  const ofertas = await Oferta.findAll({
    where: {
      fecha_cierre: { [Op.lt]: new Date() },
      activo: true
    }
  });

  for (const oferta of ofertas) {
    await Oferta.update({ activo: false }, { where: { id: oferta.id } });
  }
}

// Ejecutar la función al iniciar el servidor
darDeBajaOfertasDescontinuadas()
  .then(() => console.log('Ofertas descontinuadas actualizadas'))
  .catch(err => console.error('Error al actualizar ofertas descontinuadas:', err));

const listar = async (req, res) => {
  const estado = req.query.estado;

  let where = {};
  if (estado === 'activas') where.activo = true;
  else if (estado === 'inactivas') where.activo = false;

  const ofertas = await Oferta.findAll({
    where,
    include: [{ model: Rol, as: 'rol', attributes: ['tipo'] }]
  });

  res.json(ofertas.map(of => ({
    id: of.id,
    rol: of.rol.tipo,
    descripcion: of.descripcion,
    fecha_publicacion: of.fecha_publicacion,
    fecha_cierre: of.fecha_cierre,
    activo: of.activo
  })));
};

const darDeBaja = async (req, res) => {
  const { id } = req.params;
  await Oferta.update({ activo: false }, { where: { id } });
  res.sendStatus(200);
};

const crear = async (req, res) => {
  const { rol_id, descripcion, fecha_cierre } = req.body;

  if (!rol_id || !descripcion || !fecha_cierre) {
    return res.status(400).json({ error: 'Campos incompletos' });
  }

  await Oferta.create({
    rol_id,
    descripcion,
    fecha_publicacion: new Date(),
    fecha_cierre,
    activo: true
  });

  res.status(201).json({ mensaje: 'Oferta creada correctamente' });
};

module.exports = { listar, darDeBaja, crear };