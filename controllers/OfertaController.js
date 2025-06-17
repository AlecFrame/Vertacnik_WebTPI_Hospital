const { Oferta, Rol, Postulacion, Especialidad } = require('../models');
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
  const { rol_id, descripcion, fecha_cierre, especialidad } = req.body;

  if (!rol_id || !descripcion || !fecha_cierre) {
    return res.status(400).json({ error: 'Campos incompletos' });
  }

  // Si es médico, especialidad es obligatoria
  if (rol_id == 3 && !especialidad) {
    return res.status(400).json({ error: 'Debe seleccionar una especialidad para médicos.' });
  }

  const oferta = await Oferta.create({
    rol_id,
    descripcion,
    fecha_publicacion: new Date(),
    fecha_cierre,
    activo: true,
    especialidad_id: rol_id == 3 ? especialidad : null
  });

  res.json(oferta);
};

const obtenerPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const oferta = await Oferta.findByPk(id, {
      include: [
        { model: Rol, as: 'rol', attributes: ['tipo', 'id'] },
        { model: Especialidad, as: 'especialidad', attributes: ['id', 'nombre'] }
      ]
    });
    if (!oferta) return res.status(404).json({ error: 'Oferta no encontrada' });
    res.json(oferta);
  } catch (err) {
    console.error('Error al obtener oferta:', err);
    res.status(500).json({ error: 'Error al obtener oferta' });
  }
};

module.exports = { listar, darDeBaja, crear, obtenerPorId };