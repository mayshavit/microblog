const mongoose = require('mongoose');

/**
 * blogPost model for a blog post object
 * Every blog post object has a uniq id, author, title, contet, date posted and numer of likes.
 */
const blogPostSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    author: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    datePosted: Date,
    likes: { type: Number, default: 0 }
});

module.exports = mongoose.model('BlogPost', blogPostSchema);