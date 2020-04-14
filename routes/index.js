const express = require('express')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const imageMiddleware = require('../middlewares/imageMiddleware')


const router = express.Router()
//No codigo abaixo temos o metodo get que pode receber 3 parametros
//o primeiro é a rota.
//o Segundo é um middleware que pode fazer verificações.
//o Terceiro é o controller so ira executar se o middleware o chamar
// router.get('/', homeController.userMiddleware, homeController.index)
router.get('/', homeController.index)
router.get('/users/login', userController.login)
router.get('/singup', userController.register)
router.post('/singup', userController.registerAction)
router.get('/post/add', postController.add)
router.post('/post/add',
            imageMiddleware.upload,
            imageMiddleware.resize,
            postController.addAction
            )

router.get('/post/:slug/edit', postController.edit)
router.post('/post/:slug/edit',
            imageMiddleware.upload,
            imageMiddleware.resize,
            postController.editAction
            )

router.get('/post/:slug', postController.postView)

module.exports = router