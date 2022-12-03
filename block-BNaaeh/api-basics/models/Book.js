var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    name: { type: String, required: true },
    pages: { type: Number },
  },
  { timeStamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
