const express = require('express')
const router = express.Router();
const passport = require('passport');
require('../config/auth')(passport)

router.use(express.static('public'));

router.get('/', (req, res, next) =>{
    if (req.query.fail){
        res.render('admin/login', {layout: 'admin.hbs', message: "Usuario e/ou Senha invalidos"});
    }else{
        res.render('admin/login', {layout: 'admin.hbs', message: null});
    }

})

router.post('/', 
  passport.authenticate('local', { failureRedirect: '/login?fail=true' }),
  (req, res) => {
    res.redirect('/admin');
  });

module.exports = router;