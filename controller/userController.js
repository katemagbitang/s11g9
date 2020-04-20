// const db = require('../model/db.js');

const passport = require('passport');

const User = require('../model/user-model.js');
const Post = require('../model/post-model.js');

const userController ={
   
    getUser : function(req,res){
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
    },
    
    getEditProfile : function(req,res){
        res.render('editprofile',{
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            password: req.user.password
        })
    },

    postEditProfile : function(req,res){

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
                res.redirect('/home');
            }
        })
    },

    getEditAdmin : function(req,res){
        User.find({userType: "Regular"}, function(err, users){
            if(err){
                console.log(err);
            } else{
                res.render('adminpromotion',{
                    users: users
                })
            }
        })
    },

    postEditAdmin: function(req,res){
        User.findOneAndUpdate({username: req.body.admin}, {
            userType: "Admin"
        }, function(err,found){
            if(err){
                console.log(err);
            }
            else{
                console.log('User is an Admin');
                res.redirect('/adminpromotion');
            }
        })
    },
    postResignAdmin: function(req,res){
        User.findOneAndUpdate({_id: req.session.passport.user}, {
            userType: "Regular"
        }, function(err,found){
            if(err){
                console.log(err);
            }
            else{
                console.log('User is a Regular');
                res.redirect('/home');
            }
        })
    },

    login : function(req,res){
        // console.log('click');
        // console.log(req.body.username);
        // console.log(req.body.password);
        // passport.authenticate('local')(req, res, function () {
        //     res.redirect('/');
        //     console.log('login successful');
        //     console.log(req.session.passport.user);
        // });

        passport.authenticate('local',{
            successRedirect: '/home',
            failureRedirect: '/'
        })(req,res);
    },

    logout : function(req, res){
        req.logout();
        res.redirect('/');
    }

}

module.exports = userController;
