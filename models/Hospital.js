"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Hospital extends Model {
        static associate(models) {
            this.hasMany(models.Unidad, {
                foreignKey: 'hospitalId',
                as: 'unidades'
            });
        }
    };

    Hospital.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            nombre: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            direccion: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING(15),
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Hospital',
            tableName: 'Hospitales'
        }
    );
    return Hospital;
}