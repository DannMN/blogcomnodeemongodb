const express = require('express')
const homeController = require('../controllers/homeController')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const imageMiddleware = require('../middlewares/imageMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')


const router = express.Router()
//No codigo abaixo temos o metodo get que pode receber 3 parametros
//o primeiro é a rota.
//o Segundo é um middleware que pode fazer verificações.
//o Terceiro é o controller so ira executar se o middleware o chamar
// router.get('/', homeController.userMiddleware, homeController.index)
router.get('/', homeController.index)

router.get('/users/login', userController.login)
router.post('/users/login', userController.loginAction)
router.get('/users/logout', userController.logoutAction)

router.get('/users/singup', userController.register)
router.post('/users/singup', userController.registerAction)


router.get('/post/add', authMiddleware.isLogged, postController.add)
router.post('/post/add',
            authMiddleware.isLogged,
            imageMiddleware.upload,
            imageMiddleware.resize,
            postController.addAction
            )

router.get('/post/:slug/edit', authMiddleware.isLogged, postController.edit)
router.post('/post/:slug/edit', authMiddleware.isLogged,
            imageMiddleware.upload,
            imageMiddleware.resize,
            postController.editAction
            )

router.get('/post/:slug', postController.postView)

module.exports = router