const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("admin/index", { layout: "main.hbs" });
});

// ROTA DE LOGOUT

// router.get("/logout", (req, res, next) => {
//     req.logout((err) => {
//         if (err) { return next(err); }
//         res.redirect('/');
//     });
// });

module.exports = router;