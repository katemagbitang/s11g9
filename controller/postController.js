// const db = require('../model/db.js');

const Post = require('../model/post-model.js');

const postController ={
    
    getCreatePost : function(req,res){
        res.render('createpost');
    },

    postCreatePost : function(req,res){
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
    },
    viewAllPost : function(req,res){
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
    },

    viewPost : function(req,res){

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
                        forumauthor: posts.username.username, //nothing is posted
                        forumpost: posts.postText,
                        forumreact: posts.reacts,
                        commentcount: posts.commentNumber,
                        username: req.user.username,
                        id: posts._id,
                        UserLogged: true,
                        comments: posts.comments
                    });
                }
                else{
                    res.render('post',{
                        forumtitle: posts.title,
                        forumdate: posts.postDate,
                        forumauthor: posts.username.username,//nothing is posted
                        forumpost: posts.postText,
                        forumreact: posts.reacts,
                        commentcount: 2,
                        id: posts._id,
                        UserLogged: false,
                        comments: posts.comments
                    });
                }
            }
        })
    }
}

module.exports = postController;
