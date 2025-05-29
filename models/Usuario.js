"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            console.log("models: "+models);
            console.log("models.Rol: "+models.Rol);
            console.log("models.RolUsuario: "+models.RolUsuario);
            this.belongsToMany(models.Rol, {
                through: models.RolUsuario,
                foreignKey: 'usuario_id',
                otherKey: 'rol_id',
            });
        }
    };

    Usuario.init(
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                unique: true
            },
            dni: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            nombre: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            apellido: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            fecha_nacimiento: {
                type: DataTypes.DATE,
                allowNull: false
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            contraseña: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            fecha_registro: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            }
        }, {
            sequelize,
            modelName: 'Usuario',
            tableName: 'Usuarios'
        }
    );
    return Usuario;
};