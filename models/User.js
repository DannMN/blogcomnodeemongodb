const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')


//definindo Promise's para que o mongoose trabalhe com elas
mongoose.Promise = global.Promise
/**
 *photo
 name
 email
 */
//Apartir daqui definimos como sera nosa tabela no banco de dados,
//Os campos os tipos e etc
const userSchema = new mongoose.Schema({
    photo: String,
    name:String,     
    email:String    
})

userSchema.plugin(passportLocalMongoose, { usernameField:'email' })



module.exports = mongoose.model('User', userSchema)
// userSchema.pre('save', async function(next){
//     if(this.isModified('title')){
//         this.slug = slug( this.title, { lower:true } )

//         const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`, 'i')
        
//         const postsWithSlug = await this.constructor.find({slug:slugRegex})

//         if(postsWithSlug.length > 0) {
//             this.slug = `${this.slug}-${postsWithSlug.length + 1}`
//         }

//     }
//     next()
// })
// userSchema.statics.getTagsList = function() {
//     return this.aggregate([
//         //esta aggregate $unwind separa cada registro de acordo
//         // com o nº de tags, repetindo os outros registros.
//         {  $unwind: '$tags'  },
//         //este agregate vai agrupar as tags iguais e vai somar em count
//         {  $group: { _id: '$tags', count: { $sum:1 }  }  },
//         //ordenando do maior pro menor usamos count -1, o count 1 organiza do menor pro maior 
//         { $sort: { count:-1 } }
//     ])
// }


//exportamos o modelo criado acima