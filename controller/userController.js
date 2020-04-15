const db = require('../model/db.js');

const User = require('../model/user-model.js');
const Post = require('../model/model-schema.js');
const Comment = require('../model/comment-model');

const userController ={
    editProfile : function(req,res){
        res.render('editprofile',{
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            password: req.user.password
        })
    }
}

module.exports = userController;
