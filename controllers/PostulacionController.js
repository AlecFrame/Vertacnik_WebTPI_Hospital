const { Postulacion, Oferta, Rol, Usuario, RolUsuario } = require('../models');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

const listar = async (req, res) => {
  try {
    const estado = req.query.estado;

    const where = {};
    if (estado) where.estado = estado;

    const postulaciones = await Postulacion.findAll({
      where,
      include: [
        {
          model: Oferta,
          as: 'oferta',
          include: [{ model: Rol, as: 'rol', attributes: ['tipo', 'id'] }]
        }
      ],
      order: [['fecha_postulacion', 'DESC']]
    });

    res.json(postulaciones.map(p => ({
      id: p.id,
      nombre: `${p.nombre} ${p.apellido}`,
      email: p.email,
      dni: p.dni,
      telefono: p.telefono,
      fecha_postulacion: p.fecha_postulacion,
      estado: p.estado,
      url_cv: p.url_cv,
      oferta: {
        id: p.oferta?.id,
        descripcion: p.oferta?.descripcion,
        rol: p.oferta?.rol?.tipo,
        rol_id: p.oferta?.rol?.id
      }
    })));
  } catch (err) {
    console.error('Error al listar postulaciones:', err);
    res.status(500).json({ error: 'Error al obtener postulaciones' });
  }
};

const aceptar = async (req, res) => {
  const { id } = req.params;

  try {
    const postulacion = await Postulacion.findByPk(id, {
      include: {
        model: Oferta,
        as: 'oferta',
        include: { model: Rol, as: 'rol' }
      }
    });

    if (!postulacion) return res.status(404).json({ error: 'Postulación no encontrada' });

    // Verificar si ya fue aceptada o rechazada
    if (postulacion.estado !== 'pendiente') {
      return res.status(400).json({ error: 'La postulación ya fue procesada' });
    }

    // Crear usuario
    const contraseñaTemporal = bcrypt.hashSync('temporal123', 10); // cambiar si querés algo aleatorio

    const usuario = await Usuario.create({
      dni: postulacion.dni,
      nombre: postulacion.nombre,
      apellido: postulacion.apellido,
      fecha_nacimiento: postulacion.fecha_nacimiento,
      email: postulacion.email,
      telefono: postulacion.telefono,
      contraseña: contraseñaTemporal,
      activo: true
    });

    // Asignar rol
    await RolUsuario.create({
      usuario_id: usuario.id,
      rol_id: postulacion.oferta.rol.id
    });

    // Actualizar postulación y oferta
    postulacion.estado = 'aceptada';
    await postulacion.save();

    postulacion.oferta.activo = false;
    await postulacion.oferta.save();

    res.json({ mensaje: 'Postulación aceptada y usuario creado exitosamente' });
  } catch (err) {
    console.error('Error al aceptar postulación:', err);
    res.status(500).json({ error: 'Error al aceptar postulación' });
  }
};

const rechazar = async (req, res) => {
  const { id } = req.params;

  try {
    const postulacion = await Postulacion.findByPk(id);

    if (!postulacion) return res.status(404).json({ error: 'Postulación no encontrada' });

    if (postulacion.estado !== 'pendiente') {
      return res.status(400).json({ error: 'La postulación ya fue procesada' });
    }

    postulacion.estado = 'rechazada';
    await postulacion.save();

    res.json({ mensaje: 'Postulación rechazada correctamente' });
  } catch (err) {
    console.error('Error al rechazar postulación:', err);
    res.status(500).json({ error: 'Error al rechazar postulación' });
  }
};

module.exports = {
  listar,
  aceptar,
  rechazar
};