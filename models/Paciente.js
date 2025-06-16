"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Paciente extends Model {
        static associate(models) {
            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
            this.hasMany(models.Admision, {
                foreignKey: 'paciente_id',
                as: 'admisiones'
            });
            this.hasMany(models.Turno, {
                foreignKey: 'paciente_id',
                as: 'turnos'
            });
        }
    };

    Paciente.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            genero: {
                type: DataTypes.ENUM('M', 'F'),
                allowNull: false
            },
            fecha_nacimiento: {
                type: DataTypes.DATE,
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: true
            },
            direccion: {
                type: DataTypes.STRING,
                allowNull: true
            },
            contactos_emergencia: {
                type: DataTypes.STRING,
                allowNull: true
            },
            grupo_sanguineo: {
                type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'),
                allowNull: true
            },
            alergias: {
                type: DataTypes.STRING,
                allowNull: true
            },
            obra_social: {
                type: DataTypes.STRING,
                allowNull: true
            },
            historial_clinico: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Paciente',
            tableName: 'pacientes',
            timestamps: false
        }
    );

    return Paciente;
}