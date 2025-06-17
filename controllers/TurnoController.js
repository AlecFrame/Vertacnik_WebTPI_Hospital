const { Paciente, Usuario, Turno, Medico, Especialidad } = require('../models');
const { Op } = require('sequelize');

exports.listarTurnos = async (req, res) => {
    try {
        const turnos = await Turno.findAll({
            include: [
                {
                    model: Medico, 
                    as: 'medico',
                    include: [
                        {
                            model: Usuario,
                            as: 'usuario',
                            attributes: ['dni', 'nombre', 'apellido']
                        },
                        {
                            model: Especialidad,
                            as: 'especialidad',
                            attributes: ['nombre']
                        }
                    ]
                },
                {
                    model: Paciente,
                    as: 'paciente',
                    include: [
                        {
                            model: Usuario,
                            as: 'usuario',
                            attributes: ['dni', 'nombre', 'apellido']
                        }
                    ]
                }
            ],
            order: [['fechaHora', 'ASC']]
        });

        res.json(turnos);
    } catch (error) {
        console.error('Error al listar turnos:', error);
        res.status(500).json({ error: 'Error al listar turnos' });
    }
}

exports.crearTurno = async (req, res) => {
    const { medicoId, pacienteId, fechaHora, motivo } = req.body;

    try {
        // Validar que no haya otro turno para el doctor o paciente en ±1:30h
        const fecha = new Date(fechaHora);
        const desde = new Date(fecha.getTime() - 90 * 60 * 1000); // 1:30 antes
        const hasta = new Date(fecha.getTime() + 90 * 60 * 1000); // 1:30 después

        const conflicto = await Turno.findOne({
            where: {
                [Op.or]: [
                    { medico_id: medicoId },      // mismo doctor
                ],
                fechaHora: {
                    [Op.between]: [desde, hasta]
                }
            }
        });

        if (conflicto) {
            return res.status(400).json({ error: 'Ya existe un turno para este doctor o paciente en ese rango horario.' });
        }

        const turno = await Turno.create({
            medico_id: medicoId,
            paciente_id: pacienteId,
            fechaHora,
            motivo,
            estado: 'Pendiente'
        });

        res.status(201).json(turno);
    } catch (error) {
        console.error('Error al crear turno:', error);
        res.status(500).json({ error: 'Error al crear turno' });
    }
};