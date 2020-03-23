const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type : Schema.Types.ObjectId,
        unique: true,
        required: [true, 'Required']
    },
    password: {
        type : String,
        required: [true, 'Required']
    },
    firstName: {
        type : String,
        required: [true, 'Required']
    },
    lastName: {
        type : String,
        required: [true, 'Required']
    },
    email: {
        type : String,
        unique: true,
        required: [true, 'Required']
    },
    userType: {
        type : String,
        enum: ['Regular', 'Admin'],
        default: 'Regular'
    }
  });

  const tagSchema = new Schema({
    tagID:{
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    tag:{
        type: String,
        required: [true,'Required']
    }
  });

  const commentSchema = new Schema({
    commentID:{
        type: Number,
        unique: true,
        required: [true,'Required']
    },
    username:{
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: [true,'Required']
    },
    commentText: {
        type: String,
        required: [true,'Required']
    },
    likes:{
        type: Number
    },
    dislikes:{
        type: Number
    }
  });

  const postSchema = new Schema({
    postNumber:{
        type: Number,
        unique: true,
        required: [true, 'Required']
    },
    username: {
        type : [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: [true, 'Required']
    },
    title: {
        type : String,
        required: [true, 'Required']
    },
    postText: {
        type: String,
        required: [true, 'Required']
    },
    postDate: {
        type : { type: Date, default: Date.now() }
    },
    tags:[tagSchema],
    likes:{
        type: Number
    },
    dislikes:{
        type: Number
    },
    comments:[commentSchema],
    status:{
        type: String,
        enum: ['Pending','Approved']
    },
    photo:{
        type: String,
        required: [true, 'Required']
    }
  });
  
  var User  = module.exports = mongoose.model('User', userSchema);
  var Post = module.exports = mongoose.model('Post',postSchema);
  var Tag = module.exports = mongoose.model('Tag',tagSchema);
  var Comment = module.exports = mongoose.model('Comment',commentSchema);