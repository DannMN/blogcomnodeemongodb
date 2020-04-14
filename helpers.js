
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
exports.defaultTitle = 'Seu site ainda nao tem um titulo'
        
exports.menu = [
    {name:'Home', slug:'/'},
    {name: 'Login', slug:'/users/login'},
    {name:'Cadastrar', slug:'/users/singup'},
    {name:'Adicionar Post', slug:'/post/add'}
]
