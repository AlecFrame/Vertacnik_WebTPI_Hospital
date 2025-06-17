const Especialidad = require('../models/Especialidad');
const { Op } = require('sequelize');

exports.listarEspecialidades = async (req, res) => {
    try {
        const especialidades = await Especialidad.findAll({
            order: [['nombre', 'ASC']]
        });
        res.json(especialidades);
    } catch (error) {
        console.error('Error al listar especialidades:', error);
        res.status(500).json({ error: 'Error al listar especialidades' });
    }
}