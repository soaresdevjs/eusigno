const express = require('express'),
    mongoose = require('mongoose'),
    BlogPosts = mongoose.model("blogposts"),
    moment = require('moment');

module.exports = (router) => {
router.get('/posts/blog', (req, res) => {
    BlogPosts.find().lean().sort({data:'desc'}).then((posts) => {
        res.render('admin/posts/blog-area', {layout: 'admin.hbs', posts: posts})
    }).catch((err) => {
        console.log(err)
        res.redirect('/admin/posts/blog')
    })
})

router.get('/posts/blog/adicionar', (req, res) => {
    res.render('admin/blog-posts/createposts', {
        layout: 'admin.hbs'
    }) 
})

router.post('/posts/blog/novo', (req, res) =>{
    
    const erros = []
    const urlF = req.body.titulo.replace(/[\s]/gi, '-').toLowerCase().replace(/[^a-z0-9--]/gi, '')

    if(req.body.titulo == undefined || req.body.corpo == "" || req.body.imagem == undefined){
        erros.push({text: "Ops... Algum dado está inválido!"})
    }

    if(erros.length > 0){
        res.render('admin/blog-posts/createposts', {
            layout: 'admin.hbs', 
            erros: erros})
    }else{

        const newPost = {
            titulo: req.body.titulo,
            corpo: req.body.corpo,
            imagem: req.body.imagem,
            data: moment().format("L"),
            url: urlF
        }
        
        new BlogPosts(newPost).save().then(() => {
            console.log("Postagem criada com sucesso");
            res.redirect('/admin/posts/blog')
        }).catch((err) =>{
            console.log("Erro ao salvar postagem. Erro: " + err)
            res.redirect('/admin/posts/blog')
        })
    }
})

router.get('/posts/blog/buscar',  (req, res) =>{
    BlogPosts.find({data: req.query.data}).lean().sort({data:'desc'}).then((posts) => {
        res.render('admin/posts/blog-area', {layout: 'admin.hbs', posts: posts})
    }).catch((err) =>{
        console.log("Erro: " + err)
        res.redirect('/admin/posts/blog')})
    })

    router.get('/posts/blog/edit/:id', express.static('public'), (req, res) =>{
        BlogPosts.findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/blog-posts/editposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/blog')
        })
    })
    
    router.post('/posts/blog/edit/', (req, res) =>{
        const erros = []
        const urlF = req.body.titulo.replace(/[\s]/gi, '-').toLowerCase().replace(/[^a-z0-9--]/gi, '')
    
        if(req.body.titulo == undefined || req.body.corpo == "" || req.body.imagem == undefined){
            erros.push({text: "Signo invalido ou mensagem vazia!"})
        }
    
        if(erros.length > 0){
            BlogPosts.findOne({_id: req.body.id}).lean().then((post) =>{
                res.render("admin/blog-posts/editposts", {layout: 'admin.hbs', post: post, 
                erros: erros})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/blog')})
        }else{
        BlogPosts.updateOne({_id: req.body.id}, { $set:
            {
                "titulo": req.body.titulo,
                "corpo": req.body.corpo,
                "imagem": req.body.imagem,
                "data": moment().format("L"),
                "url": urlF,
            }
        }, () => {
            res.redirect('/admin/posts/blog')
        } )
    }})
    
    router.get('/posts/blog/delete/:id', (req, res) =>{
        BlogPosts.findOne({_id: req.params.id}).lean().then((post) =>{
            res.render("admin/blog-posts/deleteposts", {layout: 'admin.hbs', post: post})
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/blog')
        })
    })
    
    router.post('/posts/blog/delete', (req, res) =>{
        BlogPosts.remove({_id: req.body.id}).then(() =>{
            console.log('Postagem deletada com sucesso')
            res.redirect('/admin/posts/blog')
        }).catch((err) =>{
            console.log("Erro: " + err)
            res.redirect('/admin/posts/blog')
        })
    })
    
    router.get('/posts/blog/buscar', (req, res) =>{
            BlogPosts.find({data: req.query.data}).lean().sort({data:'desc'}).then((posts) => {
                res.render('admin/posts/BlogPosts', {layout: 'admin.hbs', posts: posts})
            }).catch((err) =>{
                console.log("Erro: " + err)
                res.redirect('/admin/posts/blog')
            })
})
}

