const mongoose = require('mongoose');
const { Schema } = mongoose;

const CategorySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        default: "#3B82F6" // Default blue color
    },
    icon: {
        type: String,
        default: "📁" // Default folder icon
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('categories', CategorySchema); 