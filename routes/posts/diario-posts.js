const express = require('express')
const mongoose = require('mongoose');
const PostsDiario = mongoose.model("postsdiario");


module.exports = (router) => {
    router.get('/posts/diario', (req, res)=>{
        PostsDiario.find().lean().populate('signo').sort({data:'desc'}).then((posts) => {
            res.render('admin/posts/postsdiario', {layout: 'admin.hbs', posts: posts})
        }).catch((err) => {
            console.log(err)
            res.redirect('/admin/posts')
        })
    })
    
    router.get('/posts/diario/adicionar', (req, res) => {
        res.render('admin/posts-diario/createposts', {
            layout: 'admin.hbs'
        }) 
    })
    
    router.post('/posts/diario/novo', (req, res) =>{
    
        const erros = []
    
        if(req.body.signo == undefined || req.body.mensagem == "" || req.body.amor == undefined || req.body.amizade == undefined || req.body.carreira == undefined || req.body.sexo == undefined || req.body.trabalho == undefined || req.body.vibe == undefined || req.body.sucesso == undefined){
            erros.push({text: "Ops... Algum dado está inválido!"})
        }
    
        if(erros.length > 0){
            res.render('admin/posts-diario/createposts', {
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
                data: req.body.data
            }
            new PostsDiario(newPost).save().then(() => {
                console.log("Postagem criada com sucesso");
                res.redirect('/admin/posts/diario')
            }).catch((err) =>{
                console.log("Erro ao salvar postagem. Erro: " + err)
                res.redirect('/admin/posts/diario')
            })
        }
    })
    
    router.get('/posts/diario/edit/:id', express.static('public'), (req, res) =>{
        PostsDiario.findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/posts-diario/editposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/diario')
        })
    })
    
    router.post('/posts/diario/edit/', (req, res) =>{
        const erros = []
    
        if(req.body.mensagem == "" || req.body.amor == undefined || req.body.amizade == undefined || req.body.carreira == undefined || req.body.sexo == undefined || req.body.trabalho == undefined || req.body.vibe == undefined || req.body.sucesso == undefined){
            erros.push({text: "Signo invalido ou mensagem vazia!"})
        }
    
        if(erros.length > 0){
            PostsDiario.findOne({_id: req.body.id}).lean().then((post) =>{
                res.render("admin/posts-diario/editposts", {layout: 'admin.hbs', post: post, 
                erros: erros})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/diario')})
        }else{
        PostsDiario.updateOne({_id: req.body.id}, { $set:
            {
                "mensagem" : req.body.mensagem,
                "data" : req.body.data,
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
            res.redirect('/admin/posts/diario')
        } )
    }})
    
    router.get('/posts/diario/delete/:id', (req, res) =>{
        PostsDiario.findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/posts-diario/deleteposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/diario')
        })
    })
    
    router.post('/posts/diario/delete', (req, res) =>{
        PostsDiario.remove({_id: req.body.id}).then(() =>{
            console.log('Postagem deletada com sucesso')
            res.redirect('/admin/posts/diario')
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/diario')
        })
    })
    
    router.get('/posts/diario/buscar', (req, res) =>{
        if(!req.query.data && !req.query.signo){
            res.redirect('/admin/posts/diario')
        }else if(req.query.data == ""){
            PostsDiario.find({signo: req.query.signo}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('admin/posts/postsdiario', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/diario')})
        }else if(!req.query.signo){
            PostsDiario.find({data: req.query.data}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('admin/posts/postsdiario', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/diario')})
        }else{
            PostsDiario.find({data: req.query.data, signo: req.query.signo}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('admin/posts/postsdiario', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/diario')
            })
        }})
}