const express=require('express')
const hbs = require("hbs")
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const moment = require('moment')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const routes = require('./routes/routes.js');

const db = require('./model/db.js');

const app = express()
const port = 3000

mongoose.Promise = global.Promise;

//Models
// let Post = require('./model/post-model');
// let Comment = require('./model/comment-model');
// let User = require('./model/user-model');

app.set('view engine', 'hbs')

hbs.registerPartials(__dirname + '/views/partials');
//static
app.use(express.static(__dirname + '/public'));
//body parser
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', routes);

db.connect();

//use sessions for tracking logins
// app.use(require('express-session')({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// //passport configuration
// passport.use(new LocalStrategy(
//     // User.authenticate()
//     function(username, password, done) {
//         User.findOne({ username: username }, function (err, user) {
//           if (err) { return done(err); }
//           if (!user) {
//             console.log('Incorrect Username');
//             return done(null, false, { message: 'Incorrect username.' });
//           }
//           if (!user.validPassword(password)) {
//             console.log('Incorrect Password');
//             return done(null, false, { message: 'Incorrect password.' });
//           }
//           return done(null, user);
//         });
//     }
// ));
// // passport.serializeUser(User.serializeUser());
// // passport.deserializeUser(User.deserializeUser());
// passport.serializeUser(function(user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

// mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true, useUnifiedTopology: true});
// var db = mongoose.connection;

// //check connection
// db.once('open', function(){
//     console.log('Connected to MongoDB');
// });

// //check for db errors
// db.on('error', function(err){
//     console.log(err);
// })

hbs.registerHelper('ifCond', function(v1, v2, options) {
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
});

hbs.registerHelper('memoryDateFormat', function(date) {
    return moment(date).format("DD-MMM-YYYY");
});

app.listen(port, function(){
    console.log('App listening at port ' + port)
})
