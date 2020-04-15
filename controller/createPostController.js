const db = require('../model/db.js');

const User = require('../model/user-model.js');
const Post = require('../model/model-schema.js');

const createPostController ={
    getCreatePost : function(req,res){
        res.render('createpost');
    }
}

module.exports = createPostController;
