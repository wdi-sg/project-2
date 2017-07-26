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

module.exports = {
  search
}
