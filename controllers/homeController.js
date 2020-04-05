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
    
    const posts = await Post.find()
    req.h.posts = posts

    res.render('home', h)  
}