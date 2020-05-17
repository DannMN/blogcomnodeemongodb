const User = require('../models/User')
const crypto = require('crypto')
const mailHandler = require('../handlers/mailHandler')

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
exports.logoutAction = (req, res)=>{
    req.logout()
    req.flash('success', 'Logout Feito com Sucesso!')
    res.redirect('/')
}
exports.profile = (req, res) => {
    
    res.render('profile', {})

}
exports.profileAction = async (req, res) => {
    try{
        const user = await User.findOneAndUpdate(
            { _id:req.user._id },
            { name: req.body.name, email:req.body.email },
            { new:true, runValidators:true }
        )
    } catch(e) {
        req.flash("error", "Ocorreu algum erro!: "+e.message)
        res.redirect('/profile')
        return
    }
    req.flash("success", "Dados atualizados com sucesso!")
    res.redirect('/profile')
}

exports.forget = (req, res) => {
    res.render('forget')
}

exports.forgetAction = async (req, res) => {
    // Verificar se o usuario realmente existe
    const user = await (await User.findOne( {email:req.body.email})).execPopulate()

    if ( !user ) {
        req.flash('error', 'E-mail não cadastrado.')
        res.redirect('/users/forget')
        return
    }    
    // Gerar um token (com data de expiaração) e salvar no banco
    user.resetPasswordToken = crypto.randomBytes(20).toString('hex')
    user.resetPasswordExpires = Date.now() + 3600000 // 1 hora

    await user.save()
    // Gerar link (com token) para trocar a senha
    const resetLink = `http://${req.headers.host}/users/reset/${user.resetPasswordToken}`
    
    const to = `${user.name} <${user.email}>`
    const html = `Clique no link para redefinir sua senha: <a href="${resetLink}"> Link Aqui </a>`
    const text = `Testando email com link: ${resetLink}`
    // enviar o link via e-mail para o usuario
    mailHandler.send({
        to,
        subject:"Redefir senha",
        html,
        text

    })
    req.flash('success', 'Um email foi enviado com instruções.')
    res.redirect('/users/login')

    // usuario vai acessar o link e trocar a senha.

}

exports.forgetToken = async (req, res) => {

    const user = await User.findOne( {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec()

    if ( !user ) {
        req.flash('error', 'Token expirado!')
        res.redirect('/users/forget')
        return
    }

    res.render('forgetPassword')
}

exports.forgetTokenAction = async (req, res) => {
    // verificando se o token ta valido ainda
    const user = await User.findOne( {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: { $gt: Date.now() }
    }).exec()

    if ( !user ) {
        req.flash('error', 'Token expirado!')
        res.redirect('/users/forget')
        return
    }

    //verificando se o password sao iguais
    if ( req.body.password != req.body['password-confirm'] ) {
        req.flash('error', 'Senhas estão diferentes');
        res.redirect('back')
        return
    }
        // Procurar o usuario e trocar a senha dele

    user.setPassword(req.body.password, async ()=>{
        
        await user.save()

        req.flash('success', 'Senha alterada com sucesso!')
        res.redirect('/')
    })

}