"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Cama extends Model {
        static associate(models) {
            this.belongsTo(models.Habitacion, {
                foreignKey: 'habitacionId',
                as: 'habitacion'
            });
            this.hasMany(models.Admision, {
                foreignKey: 'camaId',
                as: 'admisiones'
            });
        }
    };

    Cama.init(
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
            disponible: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            higienizada: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            habitacionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Cama',
            tableName: 'camas',
            timestamps: false
        }
    );
    return Cama;
}