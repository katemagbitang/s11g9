const mongoose = require('mongoose');

var Schema = mongoose.Schema;

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
    tags:[{type: Schema.Types.ObjectId, 
        ref: 'Tag'}],
    reacts:{
        type: Number
    },
    comments:[{ 
        type: Schema.Types.ObjectId, 
        ref: 'Comment' 
      }],
    status:{
        type: String,
        enum: ['Pending','Approved']
    },
    photo:{
        type: String,
        required: [true, 'Required']
    }
  });

  module.exports = mongoose.model('Post',postSchema);
