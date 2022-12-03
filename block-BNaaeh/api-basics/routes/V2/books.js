var express = require('express');
var router = express.Router();
var Book = require('../../models/Book');
/* GET users listing. */
router.post('/', function (req, res, next) {
  Book.create(req.body, (err, book) => {
    if (err) return res.status(400).json(err);
    res.status(200).send('book added');
  });
});
router.get('/', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books: books });
  });
});
router.get('/:id', (req, res, next) => {
  var bookId = req.params.id;
  Book.findById(bookId, (err, book) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books: book });
  });
});
router.put('/:id', (req, res, next) => {
  var bookId = req.params.id;
  Book.findByIdAndUpdate(bookId, req.body, { new: true }, (err, book) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books: book });
  });
});
router.delete('/:id', (req, res, next) => {
  var bookId = req.params.id;
  Book.findByIdAndRemove(bookId, (err, book) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books: book });
  });
});
module.exports = router;
