const express = require('express');
const app = express();
const hbs = require('express-handlebars');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
var util= require('util');
var encoder = new util.TextEncoder('utf-8');
require('dotenv').config()

//Configurações
    //Body Parser
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
    //Handlebars
        app.engine('hbs', hbs.engine({
            extname: 'hbs',
            defaultLayout: 'main',
        })); app.set('view engine','hbs');
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.MONGODB_URL,
            {   useNewUrlParser:true,
                useUnifiedTopology: true
            }).then(()=>{
            console.log("Conectado ao banco de dados!");
        }).catch((err)=>{
            console.log("Erro ao contectar ao banco de dados. Erro: " + err);
        });
    //Passport
        require("./config/auth")(passport);
            app.use(
            session({
                secret: process.env.SECRET,
                resave: false,
                saveUninitialized: true,
            })
            );
        app.use(passport.initialize());
        app.use(passport.session());

    //Conteúdo estatico(CSS, JS, Imagens)
        app.use(express.static('public'));

//Rotas
    require("./routes")(app);

const PORT = process.env.PORT || 8087
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
});