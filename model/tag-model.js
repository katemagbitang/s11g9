const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const tagSchema = new Schema({
    tagID:{
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true,'Required']
    },
    tag:{
        type: String,
        required: [true,'Required']
    }
  });

module.exports = mongoose.model('Tag',tagSchema);