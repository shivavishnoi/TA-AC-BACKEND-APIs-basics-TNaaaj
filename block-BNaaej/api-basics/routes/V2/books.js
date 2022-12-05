var express = require('express');
var router = express.Router();
var Book = require('../../models/Book');
var url = require('url');
/* GET users listing. */
router.post('/', function (req, res, next) {
  Book.create(req.body, (err, book) => {
    if (err) return res.status(400).json(err);
    res.status(200).send('book added');
  });
});
router.get('/list', (req, res, next) => {
  Book.find({}, (err, books) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books: books });
  });
});
//authors
router.get('/authors', (req, res, next) => {
  Book.distinct('author', (err, authors) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ authors });
  });
});
//categories
router.get('/category', (req, res) => {
  Book.aggregate([{ $sort: { category: 1 } }], (err, books) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books: books });
  });
});
//tags
router.get('/allTags', (req, res) => {
  Book.aggregate([{ $unwind: '$tags' }], (err, tags) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ tags: tags });
  });
});
//count tags
router.get('/allTags/count', (req, res) => {
  Book.aggregate(
    [{ $unwind: '$tags' }, { $group: { _id: '$tags', count: { $sum: 1 } } }],
    (err, tags) => {
      if (err) return res.status(400).json(err);
      res.status(200).json({ tags: tags });
    }
  );
});
//all Tags asc
router.get('/allTags/asc', (req, res) => {
  Book.distinct('tags', (err, tags) => {
    tags.sort(function (a, b) {
      if (a.toLowerCase() < b.toLowerCase()) return -1;
      if (a.toLowerCase() > b.toLowerCase()) return 1;
      return 0;
    });
    if (err) return res.status(400).json(err);
    res.status(200).json({ tags: tags });
  });
});
//filter by tag
router.get('/filter', (req, res, next) => {
  var filter = url.parse(req.url).query.split('=')[1];
  Book.find({ tags: { $in: [filter] } }, (err, books) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ books });
  });
});
router.get('/:id', (req, res, next) => {
  var bookId = req.params.id;
  Book.findById(bookId, (err, book) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ book });
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
