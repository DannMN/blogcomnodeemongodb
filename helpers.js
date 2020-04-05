
exports.responseJson = {
    pageTitle: 'Daniel Meireles',
    posts: [],
    defaultPageTitle:"Seu site ainda nao tem um titulo",
    menu: [
        {name:'Home', slug:'/'},
        {name:'Sobre', slug:'/sobre'},
        {name:'Contato', slug:'/contato'},
        {name:'Cadastro', slug:'/singup'},
        {name: 'Login', slug:'/users/login'},
        {name:'Adicionar Post', slug:'/post/add'}
    ]
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