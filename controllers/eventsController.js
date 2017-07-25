const Event = require('../models/Event')

function create (req, res) {
  var newEvent = new Event({
    name: req.body.name,
    address: req.body.address,
    reference: req.body.reference
  })

  newEvent.save(function (err, newEvent) {
    if (err) return res.send(err)

    res.send({
      status: 'ok',
      message: 'New event created'
    })
  })
}

module.exports = {
  create
}
