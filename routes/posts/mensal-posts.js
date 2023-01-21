const express = require('express')
const mongoose = require('mongoose');

const PostsMensal = mongoose.model("postsmensal");

module.exports = (router) => {
    router.get('/posts/mensal', (req, res)=>{
        PostsMensal
    .find().lean().populate('signo').sort({mes:'desc'}).then((posts) => {
            res.render('admin/posts/postsmensal', {layout: 'admin.hbs', posts: posts})
        }).catch((err) => {
            console.log(err)
            res.redirect('/admin/posts')
        })
    })
    
    router.get('/posts/mensal/adicionar', (req, res) => {
        res.render('admin/posts-mensal/createposts', {
            layout: 'admin.hbs'
        }) 
    })
    
    router.post('/posts/mensal/novo', (req, res) =>{
    
        const erros = []
    
        if(req.body.signo == undefined || req.body.mensagem == ""){
            erros.push({text: "Signo invalido ou mensagem vazia!"})
        }
    
        if(erros.length > 0){
            res.render('admin/posts-mensal/createposts', {
                layout: 'admin.hbs', 
                erros: erros})
        }else{
            const newPost = {
                signo: req.body.signo,
                mensagem: req.body.mensagem,
                mes: req.body.mes
            }
            new PostsMensal
        (newPost).save().then(() => {
                console.log("Postagem criada com sucesso");
                res.redirect('/admin/posts/mensal')
            }).catch((err) =>{
                console.log("Erro ao salvar postagem. Erro: " + err)
                res.redirect('/admin/posts/mensal')
            })
        }
    })
    
    router.get('/posts/mensal/edit/:id', express.static('public'), (req, res) =>{
        PostsMensal
    .findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/posts-mensal/editposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/mensal')
        })
    })
    
    router.post('/posts/mensal/edit/', (req, res) =>{
        const erros = []
    
        if(req.body.mensagem == "" || req.body.mes == undefined){
            erros.push({text: "Signo invalido ou mensagem vazia!"})
        }
    
        if(erros.length > 0){
            PostsMensal
        .findOne({_id: req.body.id}).lean().then((post) =>{
                res.render("admin/posts-mensal/editposts", {layout: 'admin.hbs', post: post, 
                erros: erros})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/mensal')})
        }else{
        PostsMensal
    .updateOne({_id: req.body.id}, { $set:
            {
                "mensagem" : req.body.mensagem,
                "mes" : req.body.mes,
            }
        }, () => {
            res.redirect('/admin/posts/mensal')
        } )
    }})
    
    router.get('/posts/mensal/delete/:id', (req, res) =>{
        PostsMensal
    .findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/posts-mensal/deleteposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/mensal')
        })
    })
    
    router.post('/posts/mensal/delete', (req, res) =>{
        PostsMensal
    .remove({_id: req.body.id}).then(() =>{
            console.log('Postagem deletada com sucesso')
            res.redirect('/admin/posts/mensal')
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/mensal')
        })
    })
    
    router.get('/posts/mensal/buscar', (req, res) =>{
        if(!req.query.mes && !req.query.signo){
            res.redirect('/admin/posts/mensal')
        }else if(req.query.mes == ""){
            PostsMensal
        .find({signo: req.query.signo}).lean().populate('signo').sort({mes:'desc'}).then((posts) => {
                res.render('admin/posts/postsmensal', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/mensal')})
        }else if(!req.query.signo){
            PostsMensal
        .find({mes: req.query.mes}).lean().populate('signo').sort({mes:'desc'}).then((posts) => {
                res.render('admin/posts/postsmensal', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/mensal')})
        }else{
            PostsMensal
        .find({mes: req.query.mes, signo: req.query.signo}).lean().populate('signo').sort({mes:'desc'}).then((posts) => {
                res.render('admin/posts/postsmensal', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/mensal')
            })
            }})
}