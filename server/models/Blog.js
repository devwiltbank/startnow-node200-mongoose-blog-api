// Imports Mongoose and extracts Schema to it's own variable
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creates a new Mongoose Schema

const BlogSchema = new Schema({
    title:      { type: String, required: true },
    article:    { type: String, required: true },
    published:  { type: Date, required: true },
    featured:   { type: Boolean, required: true },
    author:     { type: Schema.Types.ObjectId, ref: 'User', required: true },
   // author:     { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Blog', BlogSchema);

