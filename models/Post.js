const mongoose = require('mongoose')
const slug = require('slug')

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
const ObjId = mongoose.Schema.Types.ObjectId
const postSchema = new mongoose.Schema({
    photo: String,
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
    tags:[String],
    author: ObjId
})

postSchema.pre('save', async function(next){
    if(this.isModified('title')){
        this.slug = slug( this.title, { lower:true } )

        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')
        
        const postsWithSlug = await this.constructor.find({slug:slugRegex})

        if(postsWithSlug.length > 0) {
            this.slug = `${this.slug}-${postsWithSlug.length + 1}`
        }

    }
    next()
    
})
postSchema.statics.getTagsList = function() {
    return this.aggregate([
        //esta aggregate $unwind separa cada registro de acordo
        // com o nº de tags, repetindo os outros registros.
        {  $unwind: '$tags'  },
        //este agregate vai agrupar as tags iguais e vai somar em count
        {  $group: { _id: '$tags', count: { $sum:1 }  }  },
        //ordenando do maior pro menor usamos count -1, o count 1 organiza do menor pro maior 
        { $sort: { count:-1 } }
    ])
}
postSchema.statics.findPosts = function(filters = {}) {
    return this.aggregate([
        { $match:filters },
        { $lookup:{
            from:'users',
            let:{ 'author':'$author' },
            pipeline:[
                { $match: { $expr:{ $eq:[ '$$author', '$_id' ] } } },
                { $limit:1 }
            ],
            as:'author'
        } },
        { $addFields:{
            'author':{ $arrayElemAt:[ '$author', 0 ] }
        } }
    ])
}


//exportamos o modelo criado acima
module.exports = mongoose.model('Post', postSchema)