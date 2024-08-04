const express = require('express');
const router = express.Router();
const pagePesquisa = require("../src/controllers/homePesquisa");
const pageCadastro = require('../src/controllers/homeCadastro')
const pageLogin = require('../src/controllers/homeLogin');

// Router de Login
router.get('/login' ,pageLogin.login)

//Router de Pesquisa
router.get('/pesquisa',pagePesquisa.pesquisa)

//Router de cadastro
router.get('/cadastro' , pageCadastro.login)
router.post('/cadastro' , pageCadastro.cadastro)








module.exports = router;