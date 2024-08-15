// const dbpostgre = require('connect-pg-simple')
//
// const LoginSchema = new dbpostgre.Schema({
//     titulo: { type: String, required: true },
//     descricao: String
// });
//
// const LoginModel = dbpostgre.model('Login', LoginSchema);
//
// class Login {
//
// }
//
// module.exports = Login;


const { DataTypes } = require('sequelize');
const sequelize = require('../../db/database');

const LoginSchema = sequelize.define('Login', {
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING
    }
});

module.exports = Login;