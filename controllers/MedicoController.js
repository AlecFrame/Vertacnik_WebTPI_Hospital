const { Usuario, Medico, Especialidad } = require('../models');
const { Op } = require('sequelize');

// Listar Medicos
exports.listarMedicos = async (req, res) => {
    try {
        const medicos = await Medico.findAll({
            include: [
                {
                    model: Usuario,
                    as: 'usuario'
                },
                { model: Especialidad, as: 'especialidad' }
            ]
        });
        res.json(medicos);
    } catch (error) {
        console.error('Error al listar medicos:', error);
        res.status(500).json({ error: 'Error al listar medicos' });
    }
}