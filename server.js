const mongoose = require('mongoose')

require('dotenv').config({path:'variables.env'})
//Conexão com o banco de dados
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (error)=>{
    console.error('ERRO: '+error.message)
})
//Carregando os models
require('./models/Post')
//esta linha carrega o nosso aplicativo, logo deve vir depois de todas as dependencias
const app = require('./app')

app.set('port', process.env.PORT || 3313)

const server = app.listen(app.get('port'),()=>{
    console.log('O servidor esta rodando NA PORTA: '+server.address().port)
    
})
