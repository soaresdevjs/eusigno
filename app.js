const express = require("express"),
  app = express(),
  logger = require("morgan"),
  hbs = require("express-handlebars"),
  passport = require("passport"),
  session = require("express-session"),
  bodyParser = require("body-parser");

//require("./database"); No momento você não precisa disso

app.use(logger("dev"));
app.engine(
  "hbs",
  hbs.engine({
    extname: "hbs",
    defaultLayout: "main",
  })
);

//Coletar informações da form (ISSO É VITAL) -->
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//<--

app.set("view engine", "hbs");
app.use(express.static("public"));

//-> Não altere essa sequência.
require("./config/auth")(passport);
app.use(
  session({
    secret: "sasf74a65sf1",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
//<-

require("./routes")(app); //Sempre carregue as rotas depois do passport.

const server = app.listen(process.env.PORT || 8087, (port) => {
  console.log(
    `Servidor rodando na porta ${server.address().address}:${
      server.address().port
    }`
  );
});
