const Carpark = require('../models/Carpark')

function create (req, res) {
  // use req to create new database
  var newCarpark = new Carpark({
    name: req.body.name,
    address: req.body.address,
  })
  newCarpark.save(function (err, newCarpark) {
    if (err) throw err
    res.send({
      status: 200, // 200 means ok
      message: 'new carpark created',
      err: 'ERROR'
    })
  })
}

module.exports = {
  create
}
