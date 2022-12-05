var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    name: { type: String, required: true },
    pages: { type: Number, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    tags: {type: [String], default: []}
  },
  { timeStamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
