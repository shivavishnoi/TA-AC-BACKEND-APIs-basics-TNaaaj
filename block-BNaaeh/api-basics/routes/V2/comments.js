var express = require('express');
var router = express.Router();
var Comment = require('../../models/Comment');
var Book = require('../../models/Book');

router.post('/', (req, res, next) => {
  Comment.create(req.body, (err, Comment) => {
    if (err) return res.status(400).json(err);
    res.status(200).send('comment added');
  });
});
router.get('/', (req, res, next) => {
  Comment.find({}, (err, comments) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ comments: comments });
  });
});
router.delete('/:commentId', (req, res, next) => {
  var commentId = req.params.commentId;
  Comment.findByIdAndDelete(commentId, (err, comment) => {
    if (err) return res.status(400).json(err);
    res.status(200).json({ comment });
  });
});
module.exports = router;
