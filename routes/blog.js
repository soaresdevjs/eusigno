const express = require('express')
const mongoose = require('mongoose');
require('../models/BlogPosts')
const BlogPosts = mongoose.model("blogposts");
const router = express.Router();

router.use(express.static('public'));

router.get('/:url', (req, res) => {
    BlogPosts.findOne({url: req.params.url}).lean().then((posts) =>{
        BlogPosts.find().lean().sort({data:'desc'}).then((blog) => {
        if(posts){
            res.render("blog-posts", {layout: 'main.hbs', posts: posts, blog: blog})
        }else{
            res.redirect('/pt/404')
        }
    })
    }).catch((err) =>{
        console.log("Erro: " + err)
        res.redirect('/pt')
    })
})
module.exports = router;