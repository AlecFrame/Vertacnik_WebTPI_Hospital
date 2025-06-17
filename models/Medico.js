"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Medico extends Model {
        static associate(models) {
            this.belongsTo(models.Usuario, {
                foreignKey: 'usuario_id',
                as: 'usuario'
            });
            this.belongsTo(models.Especialidad, {
                foreignKey: 'especialidad_id',
                as: 'especialidad'
            });
            this.hasMany(models.Turno, {
                foreignKey: 'medico_id',
                as: 'turnos'
            });
        }
    }

    Medico.init(
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
            especialidad_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            matricula: {
                type: DataTypes.STRING,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Medico',
            tableName: 'medicos',
            timestamps: false
        }
    );

    return Medico;
}