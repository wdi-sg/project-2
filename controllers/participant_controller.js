const Participant = require('../models/participant')

let participantController = {
  join: (req, res) => {
    console.log('req.params', req.params.id)
    Participant.create({
      event: req.params.id,
      user: req.user.id
    }, (err, joinedEvent) => {
      if (err) {
        req.flash('error', 'Some errors occured. Please try again.')
        res.redirect(`/event/${req.params.id}`)
      } else {
        req.flash('success', 'You have joined this event.')
        res.redirect(`/user/${req.user.name}`)
      }
    })
  },
  cancel: (req, res) => {
    Participant.findOne({event: req.params.id, user: req.user.id}).populate('user')
    .populate('event').exec((err, event) => {
      if (event.user._id.equals(req.user.id)) {
        req.flash('error', 'Could withdraw from your own event.')
        res.redirect(`/event/${event.event._id}`)
        return
      }

      event.remove({}, (err) => {
        res.redirect(`/event/${event.event._id}`)
      })
    })
  }
}

module.exports = participantController
