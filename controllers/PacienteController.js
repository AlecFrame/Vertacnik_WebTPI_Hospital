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

// Crear paciente y usuario (si no existen)
exports.crearPacienteConUsuario = async (req, res) => {
    const { dni, nombre, apellido, fecha_nacimiento, email, genero, telefono, direccion } = req.body;

    try {
        let usuario = await Usuario.findOne({ where: { dni } });

        if (!usuario) {
            usuario = await Usuario.create({
                dni,
                nombre,
                apellido,
                fecha_nacimiento,
                email,
                telefono,
                contraseña: 'temporal', // se podría generar una temporal o dejar en blanco
                activo: true
            });
        }

        const pacienteExistente = await Paciente.findOne({ where: { usuario_id: usuario.id } });

        if (pacienteExistente) {
            return res.status(400).json({ error: 'El paciente ya existe' });
        }

        const paciente = await Paciente.create({
            usuario_id: usuario.id,
            genero,
            fecha_nacimiento,
            telefono,
            direccion
        });

        res.json({ mensaje: 'Paciente creado correctamente', paciente });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error creando paciente' });
    }
};

// pacienteController.js
exports.guardar = async (req, res) => {
    const { 
        id, 
        dni, 
        nombre, 
        apellido, 
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
            email: `${dni}@sinmail.com`,
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