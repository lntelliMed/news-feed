const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
  },
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
  },
  publishedAt: {
    type: Date,
    // type: String,
    required: true,
  },
});

module.exports = mongoose.model('article', ArticleSchema);
