const { Usuario, Rol, RolUsuario } = require('../models');
const bcrypt = require('bcrypt');

const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: {
        model: Rol,
        through: { attributes: [] }
      },
      order: [['id', 'ASC']]
    });

    const resultado = usuarios.map(u => ({
      id: u.id,
      dni: u.dni,
      nombre: `${u.nombre} ${u.apellido}`,
      email: u.email,
      telefono: u.telefono,
      fecha_registro: u.fecha_registro,
      activo: u.activo,
      rol: u.Rols[0]?.tipo || 'Sin rol'
    }));

    res.json(resultado);
  } catch (err) {
    console.error('Error al listar usuarios:', err);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const cambiarEstado = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    usuario.activo = !usuario.activo;
    await usuario.save();

    res.json({ mensaje: 'Estado actualizado correctamente' });
  } catch (err) {
    console.error('Error al cambiar estado del usuario:', err);
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

const cambiarRol = async (req, res) => {
  const { id } = req.params;
  const { nuevoRolId } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Eliminar el rol anterior (asumimos 1 solo por usuario)
    await RolUsuario.destroy({ where: { usuario_id: id } });

    // Asignar nuevo
    await RolUsuario.create({ usuario_id: id, rol_id: nuevoRolId });

    res.json({ mensaje: 'Rol actualizado correctamente' });
  } catch (err) {
    console.error('Error al cambiar rol del usuario:', err);
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
};

const reiniciarContraseña = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const nueva = 'temporal123';
    const hash = await bcrypt.hash(nueva, 10);
    usuario.contraseña = hash;
    await usuario.save();

    res.json({ mensaje: 'Contraseña reiniciada a: temporal123' });
  } catch (err) {
    console.error('Error al reiniciar contraseña:', err);
    res.status(500).json({ error: 'Error al reiniciar contraseña' });
  }
};

module.exports = {
  listarUsuarios,
  cambiarEstado,
  cambiarRol,
  reiniciarContraseña
};