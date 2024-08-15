require('dotenv').config();

const port = process.env.PORT;

const express = require('express');
const app = express();
const path = require('path');

// utilizando o Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));


// Conexao de metodos junto ao banco de dados para salvar cookies, flash mensage  e sessoes.
const session = require('express-session');// chavar o cookies do cliente no proprio computador do cliente
const flash = require('connect-flash');// Enviar mensagem de feedback ou de erro, salvos em session
const connectDB  = require('connect-pg-simple')(session);

const sessionOptions = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // salvar o cokkie por 7 dias
        httpOnly: true,
    }
});

// Conectando o bando de dados
const db = require('./db/db')
db.connect()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL');
        app.emit('conectado');
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados', err.stack));

app.on('conectado', () => {
    app.listen(3000, () => {
        console.log('Servidor iniciado em http://localhost:3000/');
    });
});


app.use(flash());
app.use(sessionOptions);


app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

// Buscando o arquivo de toda
const router = require('./routers/router')
app.use(router);


// Helmet
const helmet = require('helmet');
app.use(helmet());

// CSURF
const csrf = require('csurf');
app.use(csrf());

//Middleware
const { checkError, csrfMiddleware } = require('./src/middlewares/middlewares');
app.use(checkError);
app.use(csrfMiddleware);