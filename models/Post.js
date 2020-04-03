const mongoose = require('mongoose')

//definindo Promise's para que o mongoose trabalhe com elas
mongoose.Promise = global.Promise
/**
 * Titulo
 * Corpo
 * Tags
 * slug
 */
//Apartir daqui definimos como sera nosa tabela no banco de dados,
//Os campos os tipos e etc
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        //tira os espaços digitados errados
        trim: true,
        //para colocar o campo como obrigatorio
        required: 'O post precisa de um titulo'
    },
    slug:String,
    //o corpo ficou do tipo string e configurado para tirar os espacos e obrigatorio
    body: {
        type:String,
        trim:true,
        required:true
    },
    //defini as tags como array de strings 
    tags:[String]
})
//exportamos o modelo criado acima
module.exports = mongoose.model('Post', postSchema)