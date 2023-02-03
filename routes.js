const indexRouter = require("./routes/index"),
  signoRouter = require("./routes/signos"),
  adminRouter = require("./routes/admin"),
  loginRouter = require("./routes/login"),
  blogRouter = require("./routes/blog");

//Função que impede alguém não logado de acessar aquela rota.
const authenticationMiddleware = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
};

module.exports = (app) => {
  app.use("/pt", indexRouter);
  app.use("/pt/signos", signoRouter);
  app.use('/pt/blog', blogRouter);
  app.use("/login", loginRouter);
  app.use("/admin", authenticationMiddleware, adminRouter);
  app.use('*', (req, res) =>{
    res.redirect('/pt')
  })
};