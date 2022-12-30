const express = require('express');
const router = express.Router();

router.get('/:signo', (req, res) =>{
    res.sendFile(__dirname + `/signos/signo-de-${req.params.signo}.html`)
})

module.exports = router;