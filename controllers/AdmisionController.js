const { Admision, Usuario, Paciente, Turno, Unidad, Cama } = require('../models');
const { Op } = require('sequelize');

// Buscar turnos cercanos si es cita
exports.buscarTurnoCercano = async (req, res) => {
    const { dni } = req.body;
    const ahora = new Date();
    const margen = 20 * 60 * 1000; // 20 minutos

    try {
        const paciente = await Paciente.findOne({
            include: {
                model: Usuario,
                as: 'usuario',
                where: { dni }
            }
        });

        if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' });

        const turno = await Turno.findOne({
            where: {
                paciente_id: paciente.id,
                fechaHora: {
                    [Op.between]: [new Date(ahora.getTime() - margen), new Date(ahora.getTime() + margen)]
                },
                estado: 'Pendiente'
            }
        });

        if (turno) {
            return res.json({ turno, paciente });
        } else {
            return res.json({ turno: null, paciente });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error buscando turno' });
    }
};

// Crear admisión
exports.crearAdmision = async (req, res) => {
    const usuarioId = res.locals.usuario.id || req.session.userId;
    console.log('Usuario ID:', usuarioId);
    const { pacienteId, tipoIngreso, motivo, unidadId, camaId } = req.body;
    console.log('Datos de admisión:', req.body);

    try {
        const admision = await Admision.create({ 
            usuario_id: usuarioId,
            paciente_id: pacienteId,
            tipoIngreso,
            motivo,
            unidadId: unidadId,
            camaId: camaId,
            estado: 'En Proceso'
        });

        // Cambiar cama a no disponible
        await Cama.update({ disponible: false }, { where: { id: camaId } });

        res.json({ mensaje: 'Admisión creada exitosamente', admision });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear la admisión' });
    }
};

// Listar admisiones hechas por el recepcionista
exports.listarAdmisionesPorUsuario = async (req, res) => {
    const { usuarioId } = req.session;

    try {
        const admisiones = await Admision.findAll({
            where: { usuario_id: usuarioId },
            include: ['paciente', 'unidad', 'cama']
        });

        res.json(admisiones);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error listando admisiones' });
    }
};