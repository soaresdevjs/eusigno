const express = require('express');
const router = express.Router();

router.get('/:signo', (req, res) =>{
    res.status(200).sendFile(__dirname + `/signos/signo-de-${req.params.signo}.html`)
    res.status(404).send("<h1>A pagina não existe.</h1>")
})

module.exports = router;