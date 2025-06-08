"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Habitacion extends Model {
        static associate(models) {
            this.belongsTo(models.Ala, {
                foreignKey: 'alaId',
                as: 'ala'
            });
            this.hasMany(models.Cama, {
                foreignKey: 'habitacionId',
                as: 'camas'
            });
        }
    };

    Habitacion.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            numero: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            tipo: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            capacidad: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            alaId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        }, {
            sequelize,
            modelName: 'Habitacion',
            tableName: 'Habitaciones',
            timestamps: false
        }
    );
    return Habitacion;
}