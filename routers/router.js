const express = require('express');
const router = express.Router();
const homeLogin = require("../src/controllers/homeLogin");
const homeCadastro = require('../src/controllers/homeCadastro')


router.get('/cadastro' , homeCadastro.login)

router.post('/cadastro' , homeCadastro.cadastro)








module.exports = router;