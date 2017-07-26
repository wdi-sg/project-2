const Event = require('../models/Event')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('../models/User')

function create (req, res) {
  var newEvent = new Event({
    name: req.body.name,
    dateTime: req.body.dateTime,
    imgUrl: req.body.imgUrl,
    eventUrl: req.body.eventUrl
    // users: [{
    //   type: Schema.Type.ObjectId,
    //   ref: 'User'
    // }]
  })

  newEvent.save(function (err, newEvent) {
    if (err) return res.send(err)

    res.send(
      newEvent
      // status: 'ok',
      // message: 'New event created'
    )
    User.findOne({
      _id: req.user.id
    }, function(err, foundUser) {
      if (err) res.send(err)
      console.log(foundUser);
      console.log(newEvent);
      foundUser.events.push(newEvent._id)
      foundUser.save()
    })
  })
}

module.exports = {
  create
}
