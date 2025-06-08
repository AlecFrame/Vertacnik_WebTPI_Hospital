"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Ala extends Model {
        static associate(models) {
            this.belongsTo(models.Unidad, {
                foreignKey: 'unidadId',
                as: 'unidad'
            });
            this.hasMany(models.Habitacion, {
                foreignKey: 'alaId',
                as: 'habitaciones'
            });
        }
    }

    Ala.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            nombre: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            piso: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            unidadId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Ala',
            tableName: 'Alas',
            timestamps: false
        }
    );
    return Ala;
};