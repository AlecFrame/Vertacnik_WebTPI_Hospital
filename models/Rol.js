"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Rol extends Model {
        static associate(models) {
            this.belongsToMany(models.Usuario, {
                through: models.RolUsuario,
                foreignKey: 'rol_id',
                otherKey: 'usuario_id',
            });
            this.hasMany(models.Oferta, {
                foreignKey: 'rol_id',
                as: 'ofertas'
            });
        }
    };

    Rol.init (
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            tipo: {
                type: DataTypes.STRING(50)
            }
        }, {
            sequelize,
            modelName: 'Rol',
            tableName: 'Roles',
            timestamps: false
        }
    );
    return Rol;
};