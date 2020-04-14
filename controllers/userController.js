const User = require('../models/User')


exports.login = (req, res)=>{
    res.render('login')
}
exports.register = (req, res)=>{
    res.render('singup')
}
exports.registerAction = async (req, res)=>{
    const newUser = new User(req.body)    
    User.register(newUser, req.body.pass, (err)=>{
        if(err){
            console.log('Erro ao registrar: ', err)
            res.redirect('/')
            return
        }
        res.redirect('/')
    })
    
}