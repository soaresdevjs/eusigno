const localStrategy = require("passport-local").Strategy
const bcrypt = require("bcryptjs");
require('dotenv').config()

const password = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8)
const users = [
    {
      _id: 1,
      username: process.env.ADMIN_LOGIN,
      password: password
    },
  ];

module.exports = function (passport) {

  function findUser(username) {
    return users.find((item) => item.username === username);
  }

  function findUserById(id) {
    return users.find((item) => item._id === id);
  }

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    try {
      const user = findUserById(id);
      done(null, user);
    } catch (err) {
      console.log(err);
      return done(err, null);
    }
  });

  passport.use(
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          const user = findUser(username);
          if (!user)
            return done(null, false);

          const result = bcrypt.compareSync(password, user.password);
          if (!result) {
            return done(null, false);
          } else {
            console.log("Usuario conectado: " + user.username);
            return done(null, user);
          }
        } catch (err) {
          console.log(err);
          return done(err, false);
        }
      }
    )
  );
};