const mongoose = require('mongoose');

var Schema = mongoose.Schema;

  const commentSchema = new Schema({
    commentID:{
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    postNumber:{
        type: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
        required: [true, 'Required']
    },
    username:{
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
        required: [true,'Required']
    },
    commentText: {
        type: String,
        required: [true,'Required']
    },
    reacts:{
        type: Number
    }
  });

module.exports = mongoose.model('Comment',commentSchema);