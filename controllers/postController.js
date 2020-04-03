const mongoose = require('mongoose')
const Post = mongoose.model('Post')

exports.add =(req, res)=>{
    res.render('postAdd');
    
}
exports.addAction = async (req, res)=>{
    //passando o objeto desta forma os name's dos inputs devem
    //ser os mesmo dos campos no banco de dados
    const post = new Post(req.body)   
    //salva dentro do banco os dados
    await post.save()
    
    // Apos salvar o post o usuario sera redirecionado para a home
    res.redirect('/')
}