"use strict";
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class RolUsuario extends Model {
        static associate(models) { }
    };

    RolUsuario.init (
        {
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            rol_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'RolUsuario',
            tableName: 'RolesUsuarios'
        }
    );
    return RolUsuario;
};