"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Especialidad extends Model {
        static associate(models) {
            this.hasMany(models.Medico, {
                foreignKey: 'especialidad_id',
                as: 'medicos'
            });
            this.hasMany(models.Oferta, {
                foreignKey: 'especialidad_id',
                as: 'ofertas'
            });
        }
    }

    Especialidad.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            nombre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Especialidad',
            tableName: 'especialidades',
            timestamps: false
        }
    );

    return Especialidad;
}