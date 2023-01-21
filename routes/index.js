const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
  res.render('mainpage', { layout: 'main.hbs' });
})

//Rota de Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
      if (err) { return next(err); }
      res.redirect('/');
  });
});

//Rota de erro
router.get('/404', (req, res) =>{
  res.render('404')
})


module.exports = router;