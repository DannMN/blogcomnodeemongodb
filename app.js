const express = require('express')// importando o framework express
const mustache = require('mustache-express')//importando o mustache-express
const router = require('./routes')//importando as rotas
const helpers = require('./helpers')//importando objetos padrões
const errorHandler = require('./handlers/errorHandler')

//config
const app = express()
//este app.use deve ficar antes das rotas para que elas tenham acesso as informações
app.use((req, res, next)=>{
    res.locals.h = helpers//colocando os objs padrões em uma variavel global chamada h
    next()
})
//esta linha abaixo da o poder de trabalhar com json, mas eficiente em cima do router
app.use(express.json())

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
