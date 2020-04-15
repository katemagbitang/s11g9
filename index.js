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

app.get('/', function(req,res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else{
            if(req.user){
                res.render('index',{
                    UserLogged: req.user,
                    username: req.user.username,
                    firstName: req.user.firstName,
                    lastName: req.user.lastName, 
                    userType: req.user.userType,
                    email: req.user.email,
                    posts: posts
                })
            }
            else{
                res.render('index',{
                    UserLogged: req.user,
                    posts: posts
                })
            }
        }
    }).sort( { _id : -1 } ).limit(3);
})

app.post('/', function(req,res){
    console.log('click');
    console.log(req.body.username);
    console.log(req.body.password);
    passport.authenticate('local')(req, res, function () {
        res.redirect('/');
        console.log('login successful');
        console.log(req.session.passport.user);
    });
})

//done
// app.get('/signup', function(req,res){
//     res.render('registration',{})
// })
// app.get('/create_post', function(req,res){
//     res.render('createpost',{})
// })

/* in routes now hopefully
app.post('/signup', function(req,res){
    // First Validate The Request
 
    // Check if this user already exists
    let user = User.findOne({ email: req.body.email });
    // if (user) {
    //     return res.status(400).send('That user already exists!');
    // } else {
        // Insert the new user if they do not exist yet
        user = new User({
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            userType: 'Regular'
        });
        user.save();
        console.log(user);
        res.redirect('/');

    // }

})
*/


app.post('/create_post', function(req,res){
    Post.countDocuments({}, function(err,count){
        let post = new Post({
            postNumber: count+1,
            username: req.session.passport.user,
            title: req.body.dtitle,
            postText: req.body.darticle,
            postDate: Date.now(),
            commentNumber: 0,
            reacts: 0,
        });
        post.save();
        console.log('Post Added');
        let number = count+1;
        res.redirect('/post/'+ number);
    })
})

app.get('/viewall_post', function(req,res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else{
            if(req.user){
                res.render('viewallpost',{
                    posts: posts,
                    UserLogged: true
                })
            }
            else{
                res.render('viewallpost',{
                    posts: posts,
                    UserLogged: false
                })
            }
            
        }
    });
})

hbs.registerHelper('memoryDateFormat', function(date) {
    return moment(date).format("DD-MMM-YYYY");
});

app.get('/post/:id', function(req,res){

    Post.findOne({postNumber: req.params.id })
    .populate('username')
    .exec(function(err,posts){
        if(err){
            console.log(err);
        } else{
            if(req.user){
                res.render('post',{
                    forumtitle: posts.title,
                    forumdate: posts.postDate,
                    forumauthor: posts.username.username,
                    forumpost: posts.postText,
                    forumreact: posts.reacts,
                    commentcount: posts.commentNumber,
                    username: req.user.username,
                    UserLogged: true,
                    comments: posts.comments
                });
            }
            else{
                res.render('post',{
                    forumtitle: posts.title,
                    forumdate: posts.postDate,
                    forumauthor: posts.username.username,
                    forumpost: posts.postText,
                    forumreact: posts.reacts,
                    commentcount: 2,
                    UserLogged: false,
                    comments: posts.comments
                });
            }
        }
    })
})

app.get('/editprofile', function(req,res){
    res.render('editprofile',{
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        password: req.user.password
    })
})

app.post('/editprofile', function(req,res){

        User.findOneAndUpdate({_id: req.session.passport.user},{
                _id: req.session.passport.user,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                username: req.user.username,
                password: req.body.password,
                userType: req.user.userType,
        },{upsert:true, new:true}, function(err, found){
            if(err){
                console.log(err);
            }
            else{
                console.log('User Updated');
                res.redirect('/');
            }
        })

        // var id =  req.session.passport.user;
        // User.findOne({_id: id}, function(err,found){
        //     if(err){
        //         console.log(err);
        //     }
        //     else{
        //         if(req.body.firstName){
        //             found.firstName = req.body.firstname
        //         }
        //         if(req.body.lastname)
        //     }
        // })
    //username update on all posts containing previous username
})

app.get('/adminpromotion', function(req,res){
    User.find({userType: "Regular"}, function(err, users){
        if(err){
            console.log(err);
        } else{
            res.render('adminpromotion',{
                users: users
            })
        }
    })
})

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

app.listen(port, function(){
    console.log('App listening at port ' + port)
})
