const mongoose = require('mongoose')
const Post = mongoose.model('Post')


// exports.userMiddleware = (req, res, next) =>{
//     //Esta funcção sera executada assim que o usuario acessar a rota
//     //podemos adicionar aqui dentro verificações e se tudo der certo
//     //chamamos a função next() para dar continuidade
//     let info = { name: 'Daniel', id: 123 }
//     req.userInfo = info
//     next()
// }

exports.index = async (req, res)=>{

    //Esta função so iniciara caso o middleware o chame atraves da função next()
    //GET: req.query
    //POST: req.body
    //PARAMETROS DA URL: req.params
    // res.json(req.query)
    
    let info= {
        pageTitle: "Blog -- Daniel Meireles",
        posts: [],
        tags: [],
        tag:''
    }
    
    
    info.tag = req.query.t
    const tagFilter = ((typeof info.tag )!= 'undefined')? {tags: info.tag }:{}
    
    const tagsPromise =  Post.getTagsList();    
    const postsPromise = Post.find(tagFilter)

    const [tags, posts] = await Promise.all([tagsPromise, postsPromise])

    for(let i in tags){
        if(tags[i]._id == info.tag){
            tags[i].class = "selected"
        }
    }

    info.tags = tags
    info.posts = posts

    res.render('home', info)  
}