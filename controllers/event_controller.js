const Event = require('../models/event')

let eventController = {
  new: (req, res) => {
    if (!req.user) {
      req.flash('error', 'Please login to create an event.')
      res.redirect('/auth/login')
      return
    }
    res.render('event/new', {user: req.user})
  },
  create: (req, res) => {
    Event.create({
      name: req.body.name,
      startDate: req.body.satartDate,
      endDate: req.body.endDate,
      location: req.body.location,
      creator: req.user.id
    }, (err, event) => {
      if (err) {
        req.flash('error', 'Create event not successful.')
        res.redirect('/event/new')
      } else {
        req.flash('success', `${event.name} has benn created.`)
        res.redirect(`/event/${event._id}`)
      }
    })
  },
  index: (req, res) => {
    Event.find({creator: req.user.id}, (err, events) => {
      if (events.length < 0) {
        req.flash('error', 'You do not have any event listing yet')
      }
      res.render('event/index', {events: events, user: req.user})
    })
  },
  show: (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
      res.render('event/show', {event: event, user: req.user})
    })
  },
  delete: (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
      if (!event.creator.equals(req.user.id)) {
        req.flash('error', 'Only event owner are able to cancel the event.')
        return res.redirect(`/event/${event._id}`)
      }
      event.remove()
      res.redirect('/user/index')
    })
  },
  edit: (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
      if (!event.creator.equals(req.user.id)) {
        req.flash('error', 'Only event owner are able to cancel the event.')
        return res.redirect(`/event/${event._id}`)
      }
      res.rendder('user/edit', {event: event})
    })
  },
  put: (req, res) => {
    Event.findOneAndUpdate({_id: req.params.id}, {
      name: req.body.name,
      startDate: req.body.satartDate,
      endDate: req.body.endDate,
      location: req.body.location
    }, (err, editedEvent) => {
      res.render('event/show', {event: editedEvent})
    })
  }
}

module.exports = eventController
