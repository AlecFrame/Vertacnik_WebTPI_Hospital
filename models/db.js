const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'hospitalalexandria_db',    // nombre
    'root',                     // usuario
    '',                    // contraseña
    { // configuracion de la conexion
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

module.exports = sequelize;
