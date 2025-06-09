const { Unidad, Ala, Habitacion, Cama } = require('../models');

const cargarSeccion = async (req, res) => {
  const { seccion } = req.params;
  try {
    let items = [];
    switch (seccion) {
      case 'unidades':
        items = await Unidad.findAll();
        break;
      case 'alas':
        items = await Ala.findAll();
        break;
      case 'habitaciones':
        items = await Habitacion.findAll();
        break;
      case 'camas':
        items = await Cama.findAll();
        break;
      default:
        return res.status(400).send('Sección inválida');
    }
    res.render(`estructura/${seccion}`, { items });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al cargar datos');
  }
};

module.exports = {
  cargarSeccion
};
