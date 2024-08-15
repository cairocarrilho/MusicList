const express = require('express');
const router = express.Router();
const pagePesquisa = require("../src/controllers/homePesquisa");
const loginController = require('../src/controllers/loginController')
const homeController = require('../src/controllers/homeController');

// Router Home
router.get('/' ,homeController.index)

router.get('/login/index' ,loginController.login)
router.post('/login/register', loginController.register)







module.exports = router;