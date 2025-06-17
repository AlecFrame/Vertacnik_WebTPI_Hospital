"use strict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Usuario extends Model {
        static associate(models) {
            this.belongsToMany(models.Rol, {
                through: models.RolUsuario,
                foreignKey: 'usuario_id',
                otherKey: 'rol_id',
            });
            this.hasMany(models.Admision, {
                foreignKey: 'usuario_id',
                as: 'admisiones'
            });
            this.hasMany(models.Medico, {
                foreignKey: 'usuario_id',
                as: 'medicos'
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
                type: DataTypes.STRING(15),
                allowNull: false
            },
            nombre: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            apellido: {
                type: DataTypes.STRING(50),
                allowNull: false
            },
            fecha_nacimiento: {
                type: DataTypes.DATE,
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING(20),
                allowNull: true
            },
            contraseña: {
                type: DataTypes.STRING(60),
                allowNull: false
            },
            fecha_registro: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            activo: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            }
        }, {
            sequelize,
            modelName: 'Usuario',
            tableName: 'Usuarios',
            timestamps: false
        }
    );
    return Usuario;
};