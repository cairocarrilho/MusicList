exports.login = function (req, res) {
    res.render('login');
}
exports.register = (req, res) => {

    res.send(req.body);


}

require('dotenv').config();

const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

// Configuração de sessão e flash
const session = require('express-session');
const flash = require('connect-flash');
const sessionStore = require('connect-pg-simple')(session);

const sessionOptions = session({
    store: new sessionStore({
        conString: process.env.DATABASE_URL // Use sua variável de ambiente de conexão aqui
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7, // salvar o cookie por 7 dias
        httpOnly: true,
    }
});

app.use(sessionOptions);
app.use(flash());

// CSRF Protection
const csrf = require('csurf');
app.use(csrf());

// Configuração das views
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Importar e usar as rotas
const router = require('./routes/router');
app.use(router);

// Middleware para erros e CSRF
const { checkError, csrfMiddleware } = require('./src/middlewares/middlewares');
app.use(checkError);
app.use(csrfMiddleware);

// Iniciar o servidor após conectar ao banco de dados
const db = require('./db/database');
db.authenticate()
    .then(() => {
        console.log('Conectado ao banco de dados PostgreSQL');
        app.listen(process.env.PORT || 3000, () => {
            console.log(`Servidor iniciado em http://localhost:${process.env.PORT || 3000}/`);
        });
    })
    .catch(err => console.error('Erro ao conectar ao banco de dados', err));
