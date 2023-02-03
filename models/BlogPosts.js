const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BlogPosts = new Schema({
    titulo:{
        type: String,
        required: true
    },
    url:{
        type: String,
        required: true
    }
    ,
    corpo:{
        type: String,
        required: true
    },
    imagem:{
        type: String,
        required: true
    },
    data: {
        type: String,
        required: true
    }
})

mongoose.model("blogposts", BlogPosts)