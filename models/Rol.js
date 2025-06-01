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
            tableName: 'Roles'
        }
    );
    return Rol;
};