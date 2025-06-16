const { Unidad, Cama, Habitacion, Ala } = require('../models');

// Listar todas las unidades
exports.listarUnidades = async (req, res) => {
    try {
        const unidades = await Unidad.findAll();
        res.json(unidades);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener unidades' });
    }
};

// Obtener camas disponibles e higienizadas por unidad (vía Ala y Habitacion)
exports.camasDisponiblesPorUnidad = async (req, res) => {
    const { unidadId } = req.params;

    try {
        const camas = await Cama.findAll({
            where: {
                disponible: true,
                higienizada: true
            },
            include: {
                model: Habitacion,
                as: 'habitacion',
                include: {
                    model: Ala,
                    as: 'ala',
                    where: { unidadId }
                }
            }
        });

        res.json(camas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener camas disponibles' });
    }
};

exports.estructuraUnidad = async (req, res) => {
    const { unidadId } = req.params;

    try {
        const unidad = await Unidad.findByPk(unidadId, {
            include: {
                model: Ala,
                as: 'alas',
                include: {
                    model: Habitacion,
                    as: 'habitaciones',
                    include: {
                        model: Cama,
                        as: 'camas'
                    }
                }
            }
        });

        if (!unidad) {
            return res.status(404).json({ error: 'Unidad no encontrada' });
        }

        res.json(unidad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la estructura de la unidad' });
    }
};