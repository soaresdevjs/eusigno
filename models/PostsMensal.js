const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostsMensal = new Schema({
    signo:{
        type: String,
        required: true,
    },
    mensagem:{
        type: String,
        required: true
    },
    mes: {
        type: String,
        required: true
    }
})

mongoose.model("postsmensal", PostsMensal)