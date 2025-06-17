"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Unidad extends Model {
        static associate(models) {
            this.hasMany(models.Ala, {
                foreignKey: 'unidadId',
                as: 'alas'
            });
            this.belongsTo(models.Hospital, {
                foreignKey: 'hospitalId',
                as: 'hospital'
            });
            this.hasMany(models.Admision, {
                foreignKey: 'unidadId',
                as: 'admisiones'
            });
        }
    }

    Unidad.init(
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
            descripcion: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            hospitalId: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Unidad',
            tableName: 'unidades',
            timestamps: false
        }
    );
    return Unidad;
}