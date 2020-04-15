const User = require('../models/User')


exports.login = (req, res)=>{
    res.render('login')
}
exports.register = (req, res)=>{
    res.render('singup')
}
exports.loginAction = (req, res)=>{
    const { email, password } = req.body
    const auth = User.authenticate()

    auth(email, password, (error, result) =>{
        if(!result){
            req.flash('error', "Seu e-mail e/ou senha não conferem!")
            res.redirect('/users/login')
            return
        }
        req.login(result, ()=>{})

        req.flash('success', "Você foi logado com sucesso")
        res.redirect('/')
    })
    
}
exports.logoutAction = (req, res)=>{
    req.logout()
    req.flash('success', 'Logout Feito com Sucesso!')
    res.redirect('/')
}
exports.registerAction = async (req, res)=>{
    const newUser = new User(req.body)
    User.register(newUser, req.body.pass, (err)=>{
        if(err){
            console.log('Erro ao registrar: ', "Tente mais tarde!")
            res.redirect('/users/register')
            return
        }
        req.flash('success', "Registro efetuado com Sucesso. Faça o login agora")
        res.redirect('/users/login')
    })
    
}