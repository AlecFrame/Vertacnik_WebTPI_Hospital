"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Turno extends Model {
        static associate(models) {
            this.belongsTo(models.Medico, {
                foreignKey: 'medico_id',
                as: 'medico'
            });
            this.belongsTo(models.Paciente, {
                foreignKey: 'paciente_id',
                as: 'paciente'
            });
        }
    }

    Turno.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            medico_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            paciente_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fechaHora: {
                type: DataTypes.DATE,
                allowNull: false
            },
            motivo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            estado: {
                type: DataTypes.ENUM('Pendiente', 'Confirmado', 'Cancelado'),
                defaultValue: 'Pendiente'
            }
        }, {
            sequelize,
            modelName: 'Turno',
            tableName: 'turnos',
            timestamps: false
        }
    );
    
    return Turno;
}