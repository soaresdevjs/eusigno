const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../models/PostsDiario');
require('../models/PostsSemanal');
require('../models/PostsMensal');

router.use(express.static('public'));

//Rotas de postagens
require("./posts/posts")(router);

module.exports = router;