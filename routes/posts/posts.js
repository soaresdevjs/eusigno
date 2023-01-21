const express = require('express')
const mongoose = require('mongoose');
const PostsDiario = mongoose.model("postsdiario");
const PostsSemanal = mongoose.model("postssemanal");
const PostsMensal = mongoose.model("postsmensal");

function dataAtualFormatada(){
    const data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return ano+"-"+mes+"-"+dia;
}

function dataOntemFormatada(){
    const data = new Date(),
        dia  = (data.getDate()-1).toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return ano+"-"+mes+"-"+dia;
}

function dataAmanhaFormatada(){
    const data = new Date(),
        dia  = (data.getDate()+1).toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return ano+"-"+mes+"-"+dia;
}

function semanaAtualFotmatada(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var comecoAno = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var semanaNumero = Math.ceil(( ( (d - comecoAno) / 86400000) + 1)/7).toString().padStart(2, '0');
    return d.getUTCFullYear()+"-W"+semanaNumero
}

function mesAtualFormatada(){
    const data = new Date(),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'),
        ano  = data.getFullYear();
    return ano+"-"+mes;
}

const ontem = dataOntemFormatada()
const hoje = dataAtualFormatada()
const amanha = dataAmanhaFormatada()
const semana = semanaAtualFotmatada(new Date());
const mes = mesAtualFormatada()

module.exports = (router) => {
    router.get('/:signo', (req, res) =>{
            PostsDiario.find({signo: req.params.signo, data: hoje}).lean().then((posts) => {
                    res.render('signopage', {posts: posts[0], signo: req.params.signo})
                }).catch((err) => {
                    console.log(err)
                    res.redirect('/pt')
                })
    })

    router.get('/:signo/ontem', (req, res) =>{
        PostsDiario.find({signo: req.params.signo, data: ontem}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
            res.render('signopage', {posts: posts[0], signo: req.params.signo})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
    })

    router.get('/:signo/amanha', (req, res) =>{
        PostsDiario.find({signo: req.params.signo, data: amanha}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('signopage', {posts: posts[0], signo: req.params.signo})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
    })

    router.get('/:signo/semana', (req, res) =>{
        PostsSemanal.find({signo: req.params.signo, semana: semana}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('signopage', {posts: posts[0], signo: req.params.signo})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
    })

    router.get('/:signo/mes', (req, res) =>{
        PostsMensal.find({signo: req.params.signo, mes: mes}).lean().populate('signo').sort({data:'desc'}).then((posts) => {
                res.render('signopage', {posts: posts[0], signo: req.params.signo})
            }).catch((err) => {
                console.log(err)
                res.redirect('/')
            })
    })
}