const Country = require('../models/Country')

function search (req, res) {
  Country.findOne({
    name: req.body.searchInput
  }, function (err, theCountry) {
    if (err) res.send(err)

    res.render('country', {
      country: theCountry
    })
  })
}

function update (req, res) {
  Country.findOne({'name': 'singapore' },(err, country) => {
    let newUpvote = country.upvotes[0] + 1
    Country.findOneAndUpdate({ 'name': 'singapore' }, {
      '$set': {'upvotes.0': newUpvote}
    }, function (err, theCountry) {
      if (err) res.send(err)
      res.json(theCountry)
    })
  })
}

module.exports = {
  search, update
}
