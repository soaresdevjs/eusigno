const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostsSemanal = new Schema({
    signo:{
        type: String,
        required: true,
    },
    mensagem:{
        type: String,
        required: true
    },
    semana: {
        type: String,
        required: true
    }
})

mongoose.model("postssemanal", PostsSemanal)