const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
require('../models/BlogPosts')
const BlogPosts = mongoose.model("blogposts");

router.get('/', (req, res) => {
  BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
    res.render('mainpage', { layout: 'main.hbs', blog: blog})
    console.log(blog)
  }).catch((err) => {
    console.log(err)
    res.redirect('/admin/posts')
})})

router.get('/politica-de-privacidade', (req, res) => {
  res.render('privacidade', {layout: 'main.hbs'})
})

router.get('/termos-e-condicoes', (req, res) => {
  res.render('termos', {layout: 'main.hbs'})
})


router.get('/contato', (req, res) => {
  res.render('contato', {layout: 'main.hbs'})
})

router.get('/sitemap.xml', (req, res) => {
  res.sendFile(__dirname + '/sitemap.xml')
})

router.get('/robots.txt', (req, res) =>{
  res.sendFile(__dirname + '/robots.txt')
})

//Rota de Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
  });
});

//Rota de erro
router.get('/404', (req, res) =>{
  res.render('404')
})


module.exports = router;