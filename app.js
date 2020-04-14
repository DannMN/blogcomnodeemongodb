const express = require('express')// importando o framework express
const mustache = require('mustache-express')//importando o mustache-express
const cookieParser = require('cookie-parser')
const session = require('express-session')
const flash = require('express-flash')

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy


const router = require('./routes')//importando as rotas
const infoSite = require('./helpers')//importando objetos padrões
const errorHandler = require('./handlers/errorHandler')

//config
const app = express()

//esta linha abaixo da o poder de trabalhar com json, mas eficiente em cima do router
app.use(express.json())

//Sem esta linha os dados do post nao vao para a proxima parte
app.use(express.urlencoded( { extended:true } ) )

//colocando a pasta public como estatica
app.use(express.static(__dirname+'/public'))

//Para habilitar cookie
app.use(cookieParser(process.env.SECRET))


//Para habilitar session
app.use(session({
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:false
})
)
//Para habilitar mensagem flash
app.use(flash())

//este app.use deve ficar antes das rotas para que elas tenham acesso as informações

app.use((req, res, next)=>{
    
    //colocando os objs padrões em uma variavel global chamada h
    res.locals.h = infoSite    
    res.locals.flashes = req.flash()
    
    next()
})
app.use(passport.initialize())
app.use(passport.session())

const User = require('./models/User')
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//passando o acesso ao site o router
app.use('/', router)

//Esta função so executara caso o usuario tente acessar 
//uma rota que não esteja definida dentro do router
app.use(errorHandler.notFound)

//setando o mustage para trabalhar com layout 
//A função mustache() aceita dois parametros, 1º caminho das paginas fixas, 2º extenção do arquivo
app.engine('mst', mustache(__dirname+'/views/partials', '.mst'))
app.set('view engine', 'mst')//indicando a extenção dos arquivos de layout
app.set('views', __dirname + '/views')//mostrando o caminho dos arquivos de layout

module.exports = app
