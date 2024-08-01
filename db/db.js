
const Client = require('pg').Client

 const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: 5432, // porta padrão do PostgreSQL
});


module.exports =  client  ;



