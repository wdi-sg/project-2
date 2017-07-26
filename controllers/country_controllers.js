const Country = require('../models/Country')

function search (req, res) {
  Country.find({}, function (err, doc) {
      res.send(doc)
    })
}

module.exports = {
  search
}
