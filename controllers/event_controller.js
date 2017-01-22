const Event = require('../models/event')
const User = require('../models/user')
const Participant = require('../models/participant')
const async = require('async')
const moment = require('moment')

let eventController = {
  new: (req, res) => {
    res.render('event/new', {user: req.user})
  },
  index: (req, res) => {
    async.parallel({
      events: (cb) => {
        Event.find({startDate: {$gte: Date.now()}}).sort({startDate: -1}).limit(5).populate('creator').exec(cb)
      },
      past_event: (cb) => {
        Event.find({endDate: {$lte: Date.now()}}).populate('creator').exec(cb)
      }
    }
    , (err, results) => {
      console.log(results)
      if (err) {
        req.flash('Could not retreive events.')
        res.redirect('/')
        return
      }
      res.render('event/index', {results: results, user: req.user})
    })
  },
  create: (req, res) => {
    //console.log(req.body.startDate + req.body.startTime);
    Event.create({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      description: req.body.description,
      creator: req.user.id
    }, (err, event) => {
      if (err) {
        req.flash('error', 'Create event not successful.')
        res.redirect('/event/new')
      } else {
        Participant.create({
        user: req.user.id,
        event: event._id
        }, (err, event) => {
          req.flash('success', `${event.name} has benn created.`)
          res.redirect(`/user/profile`)
        })
      }
    })
  },
  show: (req, res) => {
    async.parallel({
      event: (cb) => {
        Event.findOne({_id: req.params.id}).populate('creator').exec(cb)
      },
      joined: (cb) => {
        if (!req.user) {
          cb()
        } else {
          console.log(req.user.id)
          Participant.findOne({user: req.user.id, event: req.params.id}, cb)
        }
      },
      participants: (cb) => {
        Participant.find({event: req.params.id}).populate('user').exec(cb)
      }
    }, (err, results) => {
      console.log('Event Show', results)
      res.render('event/show', {results: results, user: req.user})
    })
  },
  delete: (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
      if (!event.creator.equals(req.user.id)) {
        req.flash('error', 'Only event owner are able to cancel the event.')
        return res.redirect(`/event/${event._id}`)
      }
      event.remove()
      Participant.remove({event:req.params.id}, (err) => {
          res.redirect(`/user/profile`)
      })
    })
  },
  edit: (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
      if (!event.creator.equals(req.user.id)) {
        req.flash('error', 'Only event owner are able to cancel the event.')
        return res.redirect(`/event/${event._id}`)
      }
      res.render('event/edit', {event: event, user: req.user})
    })
  },
  put: (req, res) => {
    Event.findOneAndUpdate({_id: req.params.id}, {
      name: req.body.name,
      startDate: req.body.satartDate,
      endDate: req.body.endDate,
      location: req.body.location,
      description: req.body.description,
    }, (err, editedEvent) => {
      res.redirect(`/event/${req.params.id}`)
    })
  }
}

module.exports = eventController
