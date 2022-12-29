const express = require('express');
const app = express();
const signos = require('./routes/signos')

app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/style', (req, res)=>{
    res.sendFile(__dirname + '/public/assets/css/style.css');
})

app.get('/javascript', (req, res)=>{
    res.sendFile(__dirname + '/public/assets/js/index.js');
})

app.use('/signos', signos);

const PORT = process.env.PORT || 8087
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta http://localhost:${PORT}`)
});