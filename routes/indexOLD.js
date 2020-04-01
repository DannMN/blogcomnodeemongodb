const express = require('express')

const router = express.Router()
router.get('/', (req, res)=>{
    //usando desestruturação para pegar os parametros passados no get
    const {nome, idade} = req.query
    res.send(`Ola ${nome},
     você tem ${idade}`)
})

router.get('/posts/:id', (req, res)=>{
    const id = req.params.id

    res.send(`O id do post é: ${id}`)
})

router.get('/sobre', (req, res)=>{
    res.send('Pagina Sobre')
})

module.exports = router