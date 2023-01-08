const express = require('express');
const app = express();
const signos = require('./routes/signos')
const admin = require('./routes/admin')
const login = require('./routes/login')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const flash = require('connect-flash')
require('./config/auth')(passport)

//Configs
    //Sessions
app.use(session({
    secret: 'sasf74a65sf1',
    resave: false,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
    //Middleware
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    next()
})
    //Handlebars
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine','hbs');

    //Mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/local',
    {   useNewUrlParser:true,
        useUnifiedTopology: true
    }).then(()=>{
    console.log("Conectado ao banco de dados!");
}).catch((err)=>{
    console.log("Erro ao contectar ao banco de dados. Erro: " + err);
});
    //Static content
app.use(express.static('public'));

//Routes
app.get('/', (req, res)=>{
    res.render('admin/index', {layout: 'main.hbs'});
})

app.use('/login', login);
app.use('/signos', signos);
app.use('/admin', admin);


const PORT = process.env.PORT || 8087
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
});