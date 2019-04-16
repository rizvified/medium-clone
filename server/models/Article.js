const mongoose = require('mongoose');
const { Schema, model } = mongoose;

let ArticleSchema = new Schema({
  text: String,
  title: String,
  description: String,
  feature_img: String,
  claps: Number,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: String
    }
  ]
});

ArticleSchema.methods.clap = function() {
  this.claps++;
  return this.save();
};

ArticleSchema.methods.comment = function(c) {
  this.comments.push(c);
  return this.save();
};

ArticleSchema.methods.addAuthor = function(author_id) {
  this.author = author_id;
  return this.save();
};

ArticleSchema.methods.getUserArticle = function(_id) {
  Article.find({ author: _id }).then(article => article);
  return this.save();
};

module.exports = model('Article', ArticleSchema);
