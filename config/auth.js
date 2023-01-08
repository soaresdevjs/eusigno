const localStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

 //hashed password
const normalPassword = "123"
const hashedPassword = bcrypt.hashSync(normalPassword, 8);
console.log(hashedPassword);

const users = [{ 
    _id: 123, 
    username: "adm", 
    password: hashedPassword
}];

console.log(users);

module.exports = function(passport){
    function findUser(username){
        return users.find(item => item.username === username);
    }

    function findUserById(id){
        return users.find(item => item._id === id);
    }

    passport.serializeUser((user, done) => {
        done(null, user);
    });
 
    passport.deserializeUser((id, done) => {
        try {
            const user = findUserById(id);
                done(null, user);
        } catch (err) {
            console.log(err);
            return done(err, null)
        }
    });

    passport.use(new localStrategy({
        usernameField: 'username',
        passwordField: 'password'
    },
    (username, password, done) => {
        try{
            const user = findUser(username).then(user);
            if(!user) return done(null, false, {message: "Usuario nao encontrado"});

            const result = bcrypt.compare(password, user.password);
                if (! result) {
                  console.log("Password incorrect");
                  return done(null, false, { message: 'Password incorrect' });
                } else {
                  console.log("User logged in successfully: " + user.username);
                  return done(null, user);
                }
              }
        catch(err){
            console.log(err);
            return done(err, false)

}}));
}