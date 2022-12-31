const express = require('express');
const app = express();
const signos = require('./routes/signos')
const admin = require('./routes/admin')
const hbs = require('express-handlebars')

//Configs
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main'
})); app.set('view engine','hbs');

app.use(express.static('public'));

//Rotas
app.get('/', (req, res)=>{
    res.render('index');
})

app.get('/', (req, res)=>{
    res.render('index', {
        mensagemhoje: "maconha liberada"
    });
})

app.use('/signos', signos);
app.use('/admin', admin);


const PORT = process.env.PORT || 8087
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
});