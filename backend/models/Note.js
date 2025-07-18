// const { type } = require('@testing-library/user-event/dist/type');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const NoteSchema = new Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : "General"
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'categories',
        default : null
    },
    date : {
        type : Date,
        default : Date.now
    }
  });
  module.exports = mongoose.model('notes', NoteSchema);