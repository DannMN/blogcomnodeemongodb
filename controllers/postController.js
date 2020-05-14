const mongoose = require('mongoose')
const slug = require('slug')
const Post = mongoose.model('Post')

exports.add =(req, res)=>{
    res.render('postAdd');
    
}
//Funçã para adicionar um novo post "IMPORTANTE AS FUNÇÕES QUE SE CONECTÃO COM BANCO PRECISÃO SER ASYN AWAIT"
exports.addAction = async (req, res)=>{
    //arrumando as tags em um array separado por virgula
            //o map() vai passar por todos os itens do array e a função trim() vai tirar os espacos
    req.body.tags = req.body.tags.split(',').map(t=>t.trim())
    // Aqui vamos associar o post ao seu autor
    req.body.author = req.user._id
    //passando o objeto desta forma os name's dos inputs devem
    //ser os mesmo dos campos no banco de dados
    const post = new Post(req.body)
    //tratando erros com try catch
    try {
        //salva dentro do banco os dados
        await post.save()        
    } catch (error) {
        req.flash('error', 'Erro: '+error.message)
        return res.redirect('/post/add')
        
    }
    req.flash('success', 'Post salvo com sucesso')
    // Apos salvar o post o usuario sera redirecionado para a home
    res.redirect('/')
}
//Função para editar os post "IMPORTANTE AS FUNÇÕES QUE SE CONECTÃO COM BANCO PRECISÃO SER ASYN AWAIT"
exports.edit = async (req, res) =>{
    //pegamos aqui o slug do post passado na url
    const slug = req.params.slug
    //usamos o slug para fazer uma busca no banco que retorna o post
    const post = await Post.findOne({ slug })
    //enviamos para a tela os dados
    res.render('postEdit', post)
}
//enviando os novos dados para o banco de dados
exports.editAction = async (req, res)=>{
            //Aqui geramos un novo slug para a atualização do post
            req.body.slug = slug(req.body.title, { lower: true })
            //arrumando as tags em um array separado por virgula
            //o map() vai passar por todos os itens do array e a função trim() vai tirar os espacos
            req.body.tags = req.body.tags.split(',').map(t=>t.trim())
               
        try {
            //Procurar o item enviado no req.body
            //Pegar os dados e atualizar a função findOneAndUpdate faz as duas
            const post = await Post.findOneAndUpdate(
                    { slug:req.params.slug },
                    req.body,
                    {
                        new:true,//Returnar NOVO item, ja atualizado
                        runValidators:true
                    }
                    )
                //Mostar mensagem de sucesso
                req.flash('success', 'Post Atualizado com sucesso')
                //Redirecionar para a home
                return res.redirect('/')            
            } catch (error) {
                req.flash('error', 'Ocorreu um erro! Tente Novamente!')
                return res.redirect('/post/'+req.params.slug+'/edit')
                
            }
}
exports.postView = async (req, res)=>{
    //Pegando o slug para fazer pesquisa no banco de dados
    const slug = req.params.slug
    //encontrando o post com base no slug e retornando os dados para a const post
    const post = await Post.findOne({ slug })
    //chamando o view post e enviando o post 
    res.render('post', { post })

}