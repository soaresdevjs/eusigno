const express = require('express')
const mongoose = require('mongoose');
const PostsSemanal = mongoose.model("postssemanal");

module.exports = (router) => {
    router.get('/posts/semanal', (req, res)=>{
        PostsSemanal
    .find().lean().populate('signo').sort({semana:'desc'}).then((posts) => {
            res.render('admin/posts/postssemanal', {layout: 'admin.hbs', posts: posts})
        }).catch((err) => {
            console.log(err)
            res.redirect('/admin/posts')
        })
    })
    
    router.get('/posts/semanal/adicionar', (req, res) => {
        res.render('admin/posts-semanal/createposts', {
            layout: 'admin.hbs'
        }) 
    })
    
    router.post('/posts/semanal/novo', (req, res) =>{
    
        const erros = []
    
        if(req.body.signo == undefined || req.body.mensagem == "" || req.body.amor == undefined || req.body.amizade == undefined || req.body.carreira == undefined || req.body.sexo == undefined || req.body.trabalho == undefined || req.body.vibe == undefined || req.body.sucesso == undefined){
            erros.push({text: "Ops... Algum dado está inválido!"})
        }
    
        if(erros.length > 0){
            res.render('admin/posts-semanal/createposts', {
                layout: 'admin.hbs', 
                erros: erros})
        }else{

            const newPost = {
                signo: req.body.signo,
                mensagem: req.body.mensagem,
                combinacoes: {
                    amor: req.body.amor,
                    amizade: req.body.amizade, 
                    carreira: req.body.carreira},
                estrelas: {
                    sexo: req.body.sexo,
                    trabalho: req.body.trabalho,
                    vibe: req.body.vibe,
                    sucesso: req.body.sucesso,
                },
                semana: req.body.semana
            }
            new PostsSemanal(newPost).save().then(() => {
                console.log("Postagem criada com sucesso");
                res.redirect('/admin/posts/semanal')
            }).catch((err) =>{
                console.log("Erro ao salvar postagem. Erro: " + err)
                res.redirect('/admin/posts/semanal')
            })
        }
    })
    
    router.get('/posts/semanal/edit/:id', express.static('public'), (req, res) =>{
        PostsSemanal.findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/posts-semanal/editposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/semanal')
        })
    })
    
    router.post('/posts/semanal/edit/', (req, res) =>{
        const erros = []
    
        if(req.body.mensagem == "" || req.body.amor == undefined || req.body.amizade == undefined || req.body.carreira == undefined || req.body.sexo == undefined || req.body.trabalho == undefined || req.body.vibe == undefined || req.body.sucesso == undefined){
            erros.push({text: "Signo invalido ou mensagem vazia!"})
        }
    
        if(erros.length > 0){
            PostsSemanal.findOne({_id: req.body.id}).lean().then((post) =>{
                res.render("admin/posts-semanal/editposts", {layout: 'admin.hbs', post: post, 
                erros: erros})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/semanal')})
        }else{
        PostsSemanal.updateOne({_id: req.body.id}, { $set:
            {
                "mensagem" : req.body.mensagem,
                "semana" : req.body.semana,
                "combinacoes": {
                    'amor': req.body.amor,
                    'amizade': req.body.amizade, 
                    'carreira': req.body.carreira},
                "estrelas": {
                    'sexo': req.body.sexo,
                    'trabalho': req.body.trabalho,
                    'vibe': req.body.vibe,
                    'sucesso': req.body.sucesso,
                },
            }
        }, () => {
            res.redirect('/admin/posts/semanal')
        } )
    }})
    
    router.get('/posts/semanal/delete/:id', (req, res) =>{
        PostsSemanal
    .findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/posts-semanal/deleteposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/semanal')
        })
    })
    
    router.post('/posts/semanal/delete', (req, res) =>{
        PostsSemanal
    .remove({_id: req.body.id}).then(() =>{
            console.log('Postagem deletada com sucesso')
            res.redirect('/admin/posts/semanal')
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/semanal')
        })
    })
    
    router.get('/posts/semanal/buscar', (req, res) =>{
        if(!req.query.semana && !req.query.signo){
            res.redirect('/admin/posts/semanal')
        }else if(req.query.semana == ""){
            PostsSemanal
        .find({signo: req.query.signo}).lean().populate('signo').sort({semana:'desc'}).then((posts) => {
                res.render('admin/posts/postssemanal', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/semanal')})
        }else if(!req.query.signo){
            PostsSemanal
        .find({semana: req.query.semana}).lean().populate('signo').sort({semana:'desc'}).then((posts) => {
                res.render('admin/posts/postssemanal', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/semanal')})
        }else{
            PostsSemanal
        .find({semana: req.query.semana, signo: req.query.signo}).lean().populate('signo').sort({semana:'desc'}).then((posts) => {
                res.render('admin/posts/postssemanal', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/semanal')
            })
        }})
}