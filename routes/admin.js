const express = require('express');
const router = express.Router();
require('../models/PostsDiario');
require('../models/PostsSemanal');
require('../models/PostsMensal');
router.use(express.static('../public'));

router.get('/', (req, res) => {
    res.render('adminpage', {
        layout: 'admin.hbs'
    }) 
})

router.get('/posts', (req, res) => {
    res.render('adminpage', {
        layout: 'admin.hbs'
    }) 
})

//Rotas de criação, edição e de deletar postagens 
require("./posts/diario-posts")(router);
require("./posts/semanal-posts")(router);
require("./posts/mensal-posts")(router);

module.exports = router;