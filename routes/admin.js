const express = require('express');
const router = express.Router();

router.use(express.static('public'));

router.get('/', (req, res)=>{
    res.render('admin/adminpage', {layout: 'admin.hbs'})
})

router.get('/addmensagem', (req, res) => {
    res.render('admin/addmensagem', {layout: 'admin.hbs'})
})

module.exports = router;