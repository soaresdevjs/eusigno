const localStrategy = require("passport-local").Strategy
, bcrypt = require("bcryptjs");

const users = [
    {
      _id: 123,
      username: "adm",
      password: "$2a$08$J1whuk.i0Ml4FTU843GUCOvOqfQ3DHR6fV2xP2oPYpuJFQK5GxdlO", //123
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
          console.log("Usuario", user)
          if (!user)
            return done(null, false, { message: "Usuario nao encontrado" });

          const result = bcrypt.compareSync(password, user.password);
          if (!result) {
            console.log("Password incorrect");
            return done(null, false, { message: "Password incorrect" });
          } else {
            console.log("User logged in successfully: " + user.username);
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
