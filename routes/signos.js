const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.get('/:signo', (req, res) =>{
        res.render(`signos/${req.params.signo}`)
})

module.exports = router;