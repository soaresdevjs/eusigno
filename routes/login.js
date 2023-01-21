const express = require('express')
const router = express.Router();
const passport = require('passport');
require('../config/auth')(passport)

router.use(express.static('public'));

//Rota de Login
router.get('/', (req, res, next) =>{
    if (req.query.fail){
        res.render('loginarea', {layout: 'login.hbs', message: "Usuário e/ou Senha invalidos"});
    }else{
        res.render('loginarea', {layout: 'login.hbs', message: null});
    }

})
  router.post("/",
    passport.authenticate("local", {
        successRedirect: "/admin",
        failureRedirect: "/login?fail=true",
    })
);

module.exports = router;