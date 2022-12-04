var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
var State = require('../models/State');

router.post('/:countryId', (req, res, next) => {
  var countryId = req.params.countryId;
  State.create(req.body, (err, state) => {
    if (err) return res.status(400).json(err);
    Country.findByIdAndUpdate(
      countryId,
      { $push: { states: state._id } },
      { new: true },
      (err, country) => {
        if (err) return res.status(400).json(err);
        res.status(200).json(country);
      }
    );
  });
});
//states for a country in ascending/descending order
// use aggregate with sort instead of below method
router.get('/:countryId/:order', (req, res, next) => {
  var countryId = req.params.countryId;
  var order = req.params.order;
  State.find({ country: countryId }, (err, states) => {
    if (err) res.status(400).json(err);
    if (order == 'asc') {
      states.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        return 0;
      });
      return res.status(200).json(states);
    }
    if (order == 'des') {
      states.sort(function (a, b) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
      return res.status(200).json(states);
    }
  });
});
// states in an ascending order of their population
router.get('/population', (req, res, next) => {
  State.aggregate([{ $sort: { population: 1 } }], (err, states) => {
    if (err) res.status(400).json(err);
    return res.status(200).json(states);
  });
});

module.exports = router;
