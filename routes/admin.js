const express = require('express');
const router = express.Router();
require('../models/SignosPosts');
const mongoose = require('mongoose');
const SignosPosts = mongoose.model("signosPosts");

router.use(express.static('public'));

router.get('/', (req, res)=>{
    
    SignosPosts.find().lean().populate('signo').sort({data:'desc'}).then((posts) => {
        res.render('admin/adminpage', {layout: 'admin.hbs', posts: posts})
    }).catch((err) => {
        console.log(err)
        res.redirect('/admin')
    })

})

router.get('/postagens', (req, res) => {
    res.render('admin/postagens', {layout: 'admin.hbs'})
    
})

router.post('/postagens/novo', (req, res) =>{

    const erros = []

    if(req.body.signo == null || req.body.mensagem == ""){
        erros.push({text: "Signo invalido ou mensagem vazia!"})
    }

    if(erros.length > 0){
        res.render('admin/postagens', {layout: 'admin.hbs', erros: erros})
    }else{
        const newPost = {
            signo: req.body.signo,
            mensagem: req.body.mensagem,
            data: req.body.data
        }

        new SignosPosts(newPost).save().then(() => {
            console.log("Postagem criada com sucesso");
            res.redirect('/admin')
        }).catch((err) =>{
            console.log("Erro ao salvar postagem. Erro: " + err)
            res.redirect('/admin')
        })
    }
})

module.exports = router;