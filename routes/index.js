const express = require('express')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')


const router = express.Router()
//No codigo abaixo temos o metodo get que pode receber 3 parametros
//o primeiro é a rota.
//o Segundo é um middleware que pode fazer verificações.
//o Terceiro é o controller se so ira executar se o middleware o chamar
// router.get('/', homeController.userMiddleware, homeController.index)
router.get('/', homeController.index)
router.get('/singup', userController.register)
router.get('/users/login', userController.login)

module.exports = router