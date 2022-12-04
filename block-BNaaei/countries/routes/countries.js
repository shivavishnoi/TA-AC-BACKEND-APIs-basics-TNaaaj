var express = require('express');
var router = express.Router();
var Country = require('../models/Country');
/* GET users listing. */
router.post('/', function (req, res, next) {
  Country.create(req.body, (err, country) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(country);
  });
});
//countries in ascending or descending order
router.get('/asc', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if (err) return res.status(400).json(err);
    countries.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      return 0;
    });
    res.status(200).json(countries);
  });
});
router.get('/des', (req, res, next) => {
  Country.find({}, (err, countries) => {
    if (err) return res.status(400).json(err);
    countries.sort(function (a, b) {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
    res.status(200).json(countries);
  });
});
//update/delete a country
router.put('/:id', (req, res, next) => {
  var countryId = req.params.id;
  Country.findByIdAndUpdate(
    countryId,
    req.body,
    { new: true },
    (err, country) => {
      if (err) return res.status(400).json(err);
      res.status(200).json(country);
    }
  );
});
router.delete('/:id', (req, res, next) => {
  var countryId = req.params.id;
  Country.findByIdAndDelete(countryId, (err, country) => {
    if (err) return res.status(400).json(err);
    res.status(200).json(country);
  });
});
// all ethnicity present in entire country dataaset.
// this method not working
// router.get('/ethnicity', (req, res) => {
//   Country.find.distinct('ethnicity', (err, results) => {
//     if (err) return res.status(400).json(err);
//     res.status(200).json({ ethnicity: results });
//   });
// });

module.exports = router;
