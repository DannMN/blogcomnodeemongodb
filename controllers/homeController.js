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
    let responseJson = {
        pageTitle: 'Daniel Meireles',
        userInfo: req.userInfo,
        posts: []
        // nome: req.query.nome || "Daniel",
        // idade: req.query.idade || 34,
        // mostrar: false,
        // ingredientes:[
        //     {nome: 'Arroz', quat: '20g' },
        //     {nome: 'Macarrão', quat: '500g'},
        //     {nome: 'Feijão', quat: '1kg'}
        // ],
        // interesses: ['node', 'js','css'],
        // teste:'<strong>Testando Negrito</strong>'
    }
    const posts = await Post.find()
    responseJson.posts = posts

    res.render('home', responseJson)  
}