const Country = require('../models/Country')
const Vote = require('../models/Vote')

function search (req, res) {
  Country.findOne({
    name: req.body.searchInput
  }, function (err, theCountry) {
    if (err) res.send(err)
    res.redirect('/countries/' + theCountry.id)
  })
}

function show (req, res) {
  Country
  .findById(req.params.id)
  .exec(function (err, countryData) {
    if (err) res.send(err)

    Vote
    .aggregate(
      [{ $match: { country: req.params.id } },
      {
        $group: {
          _id: { 'month': '$month', 'points': '$points' },
          count: { $sum: '$points' }
        }
      }],
      function (err, voteDataz) {
        if (err) res.send(err)

        var voteData = JSON.stringify(voteDataz)
        res.render('countries/show', {
          countryData,
          voteData
        })
      })
  })
}

module.exports = {
  search, show
}
