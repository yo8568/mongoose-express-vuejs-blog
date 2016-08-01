var mongoose = require('./db');

var PostSchema = new mongoose.Schema({
	
    Author: String,
	Date: {type: Date, default: Date.now},
    Title:   String,
    body:   String,
});

PostSchema.methods.addPost = function(post, callback) {
	
    this.Author = post.Author;
	this.Date = Date.now();
    this.Title = post.Title;
    this.body = post.body;
	this.save(callback);
}
var Post = mongoose.model('post', PostSchema);
module.exports = Post;