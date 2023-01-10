const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SignosPosts = new Schema({
    signo:{
        type: String,
        required: true,
    },
    mensagem:{
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: new Date()
    }
})

mongoose.model("signosPosts", SignosPosts)