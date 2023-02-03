const express = require('express')
const mongoose = require('mongoose');
const PostsDiario = mongoose.model("postsdiario");
const PostsSemanal = mongoose.model("postssemanal");
const PostsMensal = mongoose.model("postsmensal");
const BlogPosts = mongoose.model("blogposts");
const moment = require('moment')

const ontem = moment(new Date()).subtract(1, 'days').format("YYYY-MM-DD")
const hoje = moment(new Date()).format("YYYY-MM-DD");
const amanha = moment(new Date()).add(1, 'days').format("YYYY-MM-DD")

const semana = () => {
    let ano = moment().year();
    let semana = moment().week();
    return `${ano}-0${semana}W`
}

const mes = () => {
    let ano = moment().year();
    let mes = moment().month()+1;
    return `${ano}-0${mes}`
}


module.exports = (router) => {
    
    router.get('/:signo', (req, res) =>{
        BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
            PostsDiario.find({signo: req.params.signo, data: hoje}).lean().then((posts) => {
                    res.render('signopage', {posts: posts[0], signo: req.params.signo, blog: blog})
                }).catch((err) => {
                    console.log(err)
                    res.redirect('/pt')
                })
            })
        })

    router.get('/:signo/ontem', (req, res) =>{
        BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
        PostsDiario.find({signo: req.params.signo, data: ontem}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
            res.render('signopage', {posts: posts[0], signo: req.params.signo, blog: blog})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
        })
    })

    router.get('/:signo/amanha', (req, res) =>{
        BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
        PostsDiario.find({signo: req.params.signo, data: amanha}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('signopage', {posts: posts[0], signo: req.params.signo, blog: blog})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
        })
    })

    router.get('/:signo/semana', (req, res) =>{
        BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
        PostsSemanal.find({signo: req.params.signo, semana: semana()}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('signopage', {posts: posts[0], signo: req.params.signo, blog: blog})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
        })
    })

    router.get('/:signo/mes', (req, res) =>{
        BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
        PostsMensal.find({signo: req.params.signo, mes: mes()}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('signopage', {posts: posts[0], signo: req.params.signo, blog: blog})
                console.log(posts[0])
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
        })
    })
}