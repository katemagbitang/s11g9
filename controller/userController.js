// const db = require('../model/db.js');

var passport = require('passport');

const User = require('../model/user-model.js');
const Post = require('../model/model-schema.js');

const userController ={
   
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
                res.redirect('/');
            }
        })
    },

    editAdmin : function(req,res){
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

    login : function(req,res){
        console.log('click');
        console.log(req.body.username);
        console.log(req.body.password);
        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
            console.log('login successful');
            console.log(req.session.passport.user);
        });
    },

    logout : function(req, res){
        req.logout();
        res.redirect('/');
    },

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
    }

}

module.exports = userController;
