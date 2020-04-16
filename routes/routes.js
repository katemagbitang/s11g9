const express = require('express');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// import module `controller` from `../controllers/controller.js`
const controller = require('../controller/controller.js');

const registerController = require('../controller/registerController.js');

const postController = require('../controller/postController.js');

const userController = require('../controller/userController.js');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
    // User.authenticate()
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            console.log('Incorrect Username');
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            console.log('Incorrect Password');
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.get('/favicon.ico', controller.getFavicon);

app.get('/', controller.getIndex);

app.get('/', userController.getUser);

app.post('/', userController.login);

app.get('/signup', registerController.getRegistration);

app.post('/signup', registerController.postRegistration);

app.get('/logout', userController.logout);

app.get('/create_post', postController.getCreatePost);

app.get('/editprofile', userController.getEditProfile);

app.get('/adminpromotion', userController.editAdmin);

app.post('/create_post', postController.postCreatePost);

app.get('/viewall_post', postController.viewAllPost);

app.post('/editprofile', userController.postEditProfile);

app.get('/post/:id', postController.viewPost);

module.exports = app;