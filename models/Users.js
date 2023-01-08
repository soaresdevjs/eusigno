const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Users = new Schema({
    login:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true
    }
})

mongoose.model("users", Users)