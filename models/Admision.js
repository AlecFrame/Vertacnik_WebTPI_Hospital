"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Admision extends Model {
        static associate(models) {
            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
            this.belongsTo(models.Paciente, {
                foreignKey: 'paciente_id',
                as: 'paciente'
            });
            this.belongsTo(models.Unidad, {
                foreignKey: 'unidadId',
                as: 'unidad'
            });
            this.belongsTo(models.Cama, {
                foreignKey: 'camaId',
                as: 'cama'
            });
        }
    }

    Admision.init(
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
            paciente_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fecha: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            fechaAlta: {
                type: DataTypes.DATE,
                allowNull: true
            },
            motivo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            tipoIngreso: {
                type: DataTypes.ENUM('Cita', 'Emergencia', 'Derivado'),
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM('Pendiente', 'En Proceso', 'Finalizada'),
                defaultValue: 'Pendiente'
            },
            unidadId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            camaId: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Admision',
            tableName: 'admisiones',
            timestamps: false
        }
    );
    
    return Admision;
};