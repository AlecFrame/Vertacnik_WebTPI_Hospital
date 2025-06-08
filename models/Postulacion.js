"use restrict";
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Postulacion extends Model {
        static associate(models) {
            this.belongsTo(models.Oferta, {
                foreignKey: 'oferta_id',
                as: 'oferta'
            });
        }
    };

    Postulacion.init(
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
            email: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            telefono: {
                type: DataTypes.STRING(20),
                allowNull: true
            },
            fecha_nacimiento: {
                type: DataTypes.DATE,
                allowNull: false
            },
            url_cv: {
                type: DataTypes.STRING(255),
                allowNull: false
            },
            oferta_id: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fecha_postulacion: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW
            },
            estado: {
                type: DataTypes.ENUM('pendiente', 'aceptada', 'rechazada'),
                defaultValue: 'pendiente'
            }
        }, {
            sequelize,
            modelName: 'Postulacion',
            tableName: 'Postulaciones',
            timestamps: false
        }
    );

    return Postulacion;
}