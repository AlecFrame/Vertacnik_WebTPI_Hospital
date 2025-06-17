const { Paciente, Usuario, RolUsuario } = require('../models');
const bcrypt = require('bcrypt');

// Buscar paciente por DNI
exports.buscarPacientePorDni = async (req, res) => {
    const { dni } = req.body;
    console.log('DNI recibido:', dni);
    if (!dni || dni.length === 0) {
        return res.status(400).json({ error: 'DNI es requerido' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { dni } });

        if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

        const paciente = await Paciente.findOne({ where: { usuario_id: usuario.id } });

        if (!paciente) return res.status(404).json({ error: 'Paciente no registrado' });

        console.log('Paciente encontrado:', paciente);

        res.json({ usuario, paciente });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error buscando paciente' });
    }
};

exports.crear = async (req, res) => {
    const { 
        dni, nombre, apellido, email, fecha_nacimiento, genero, telefono, direccion,
        contactos_emergencia, grupo_sanguineo, obra_social, alergias 
    } = req.body;

    try {
        // Verifica si ya existe un usuario con ese DNI
        const usuarioExistente = await Usuario.findOne({ where: { dni } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'Ya existe un paciente con ese DNI.' });
        }

        const contraseñaTemporal = require('bcrypt').hashSync(dni, 10);

        const usuario = await Usuario.create({ 
            dni, nombre, apellido, fecha_nacimiento,
            email: email,
            telefono,
            contraseña: contraseñaTemporal,
            activo: true
        });

        await RolUsuario.create({
            usuario_id: usuario.id,
            rol_id: 2 // Paciente
        });

        const paciente = await Paciente.create({ 
            usuario_id: usuario.id, genero, fecha_nacimiento, telefono, direccion,
            contactos_emergencia, grupo_sanguineo, alergias, obra_social
        });

        res.json({ paciente, usuario });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al crear el paciente' });
    }
};

// pacienteController.js
exports.guardar = async (req, res) => {
    const { 
        id, 
        dni, 
        nombre, 
        apellido,
        email,
        fecha_nacimiento, 
        genero, telefono, 
        direccion, 
        contactos_emergencia, 
        grupo_sanguineo, 
        obra_social, 
        alergias 
    } = req.body;

    try {
        let paciente;
        if (id) {
        // Actualiza paciente existente
        paciente = await Paciente.findByPk(id);
        if (paciente) {
            await paciente.update({ 
                genero, 
                fecha_nacimiento, 
                telefono, 
                direccion, 
                contactos_emergencia, 
                grupo_sanguineo, 
                alergias, 
                obra_social 
            });
        }
        } else {
        // Crear nuevo paciente y su usuario asociado
        const contraseñaTemporal = bcrypt.hashSync(dni, 10); // Generar contraseña temporal

        const usuario = await Usuario.create({ 
            dni, 
            nombre, 
            apellido,
            fecha_nacimiento,
            email: email,
            telefono,
            contraseña: contraseñaTemporal, // Contraseña temporal
            activo: true
        });
            await RolUsuario.create({
                usuario_id: usuario.id,
                rol_id: 2 // Asignar rol de paciente
            });
            paciente = await Paciente.create({ 
                usuario_id: usuario.id, 
                genero,
                fecha_nacimiento,
                telefono, 
                direccion, 
                contactos_emergencia, 
                grupo_sanguineo,
                alergias,
                obra_social
            });
        }

        res.json({ paciente });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al guardar el paciente' });
    }
};

exports.generarDniTemporal = async (req, res) => {
    try {
        // Busca el último usuario con DNI tipo NN###
        const ultimo = await Usuario.findOne({
            where: {
                dni: { [require('sequelize').Op.like]: 'NN%' }
            },
            order: [['dni', 'DESC']]
        });

        let nuevoNumero = 1;
        if (ultimo && /^NN\d+$/.test(ultimo.dni)) {
            nuevoNumero = parseInt(ultimo.dni.slice(2), 10) + 1;
        }
        const dniTemporal = `NN${String(nuevoNumero).padStart(3, '0')}`;
        res.json({ dniTemporal });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error generando DNI temporal' });
    }
};

exports.listarPacientes = async (req, res) => {
    try {
        const pacientes = await Paciente.findAll({
            include: [{
                model: Usuario,
                as: 'usuario'
            }]
        });

        res.json(pacientes);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al listar pacientes' });
    }
}