const express = require('express');
const router = express.Router();
require('../models/SignosPosts');
const mongoose = require('mongoose');
const SignosPosts = mongoose.model("signosPosts");

router.use(express.static('public'));

router.get('/', (req, res)=>{
    res.render('admin/adminpage', {layout: 'admin.hbs'})
})

router.get('/postagens', (req, res) => {
    res.render('admin/postagens', {layout: 'admin.hbs'})
})

router.post('/postagens/novo', (req, res) =>{

    const erros = []

    if(req.body.signo == null){
        erros.push({text: "Nenhum signo selecionado"})
    }

    if(erros.length > 0){
        res.render('admin/postagens', {erros: erros})
    }else{
        const newPost = {
            signo: req.body.signo,
            mensagem: req.body.mensagem
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