const app = require('./app')
const mongoose = require('mongoose')

require('dotenv').config({path:'variables.env'})

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true , useUnifiedTopology: true})
mongoose.Promise = global.Promise
mongoose.connection.on('error', (error)=>{
    console.error('ERRO: '+error.message)
})

app.set('port', process.env.PORT || 3313)

const server = app.listen(app.get('port'),()=>{
    console.log('O servidor esta rodando NA PORTA: '+server.address().port)
    
})
