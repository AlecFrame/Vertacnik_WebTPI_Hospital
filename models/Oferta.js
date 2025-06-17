"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Oferta extends Model {
        static associate(models) {
            this.belongsTo(models.Rol, {
                foreignKey: 'rol_id',
                as: 'rol'
            });
            this.hasMany(models.Postulacion, {
                foreignKey: 'oferta_id',
                as: 'postulaciones'
            });
        }
    };

    Oferta.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            rol_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            fecha_publicacion: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            fecha_cierre: {
                type: DataTypes.DATE,
                allowNull: false
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            especialidad_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        }, {
            sequelize,
            modelName: 'Oferta',
            tableName: 'ofertas',
            timestamps: false
        }
    );

    return Oferta;
}