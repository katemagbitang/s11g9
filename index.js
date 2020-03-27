const express=require('express')
const hbs = require("hbs")
const mongoose = require('mongoose')
const app = express()
const port = 9090

mongoose.connect('mongodb://localhost/nodekb', {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

//check for db errors
db.on('error', function(err){
    console.log(err);
})

//Bring in Models
let Post = require('./model/post-model');
let Comment = require('./model/comment-model');
let User = require('./model/user-model');


app.set('view engine', 'hbs')

hbs.registerHelper('isFriend',
function(friend){
    var value;
    if(friend)
        value ='Unfriend';
    else value = 'Add Friend';
    return value;
})

hbs.registerPartials(__dirname + '/views/partials');
app.use(express.static(__dirname + '/public'));
var usernames= "Default";
var ids= "Default";
app.get('/', function(req,res){res.render('index',{})})

app.get('/signup', function(req,res){
    res.render('registration',{})
})
app.get('/create_post', function(req,res){
    res.render('createpost',{})
})
app.get('/viewall_post', function(req,res){
    Post.find({}, function(err, posts){
        if(err){
            console.log(err);
        } else{
            res.render('viewallpost',{
                posts: posts
            })
        }
    });
})

app.get('/post/:id', function(req,res){
    // Post.findOne({postNumber: req.params.id }, function(err, posts){
    //     if(err){
    //         console.log(err);
    //     } else{
    //         console.log(req.params.id);
    //         res.render('post',{
    //             forumtitle: posts.title,
    //             forumdate: posts.postDate,
    //             forumauthor: posts.username,
    //             forumpost: posts.postText,
    //             forumreact: posts.like,
    //             commentcount: 2
    //         });
    //     }
    // });

    Post.findOne({postNumber: req.params.id })
    .populate('comments').populate('username')
    .exec(function(err,posts){
        if(err){
            console.log(err);
        } else{
            console.log(posts.comments);
            res.render('post',{
                forumtitle: posts.title,
                forumdate: posts.postDate,
                forumauthor: posts.username.username,
                forumpost: posts.postText,
                forumreact: posts.like,
                commentcount: 2,
                comments: posts.comments
            });
        }
    })
})

app.listen(port, function(){
    console.log('App listening at port ' + port)
})
