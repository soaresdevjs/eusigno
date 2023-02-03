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
    combinacoes:{
        amor: {
            type: String,
            required: true
        }, 
        amizade: {
            type: String,
            required: true
        },
        carreira: {
            type: String,
            required: true
        }},
    estrelas:{
        sexo: {
            type: Number,
            required: true
        }, 
        trabalho: {
            type: Number,
            required: true
        },
        vibe: {
            type: Number,
            required: true
        },
        sucesso: {
            type: Number,
            required: true
        }},
    semana: {
        type: String,
        required: true
    }
})

mongoose.model("postssemanal", PostsSemanal)