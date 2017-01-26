const Participant = require('../models/participant')
const Event = require('../models/event')
const multer = require('multer')
const upload = multer({dest: './uploads/'})
const async = require('async')

let participantController = {
  join: (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (event.vacancy > 0) {
        async.parallel([
          (cb) => {
            Participant.create({
              event: req.params.id,
              user: req.user.id
            }, cb)
          },
          (cb) => {
            event.update({$inc: {vacancy: -1}}, cb)
          }], (err, results) => {
          if (err) {
            req.flash('error', 'Some errors occured. Please try again.')
            res.redirect(`/event/${req.params.id}`)
          } else {
            req.flash('success', 'You have joined this event.')
            res.redirect(`/user/profile`)
          }
        })
      } else {
        req.flash('error', 'Sorry. The event is full.')
        res.redirect(`/event/${req.params.id}`)
      }
    })
  },
  cancel: (req, res) => {
    Participant.findOne({event: req.params.id, user: req.user.id})
    .populate('event').exec((err, participation) => {
      if (participation.event.creator.equals(req.user.id)) {
        req.flash('error', 'Could withdraw from your own event.')
        res.redirect(`/event/${participation.event._id}`)
        return
      }
      Event.findOneAndUpdate({_id: req.params.id}, {$inc: {vacancy: 1}}, (err, x) => {
        participation.remove({}, (err) => {
          res.redirect(`/event/${participation.event._id}`)
        })
      })
    })
  }
}

module.exports = participantController
