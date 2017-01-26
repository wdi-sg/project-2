const Event = require('../models/event')
const User = require('../models/user')
const Category = require('../models/category')
const Participant = require('../models/participant')
const cloudinary = require('cloudinary')
const async = require('async')

let eventController = {
  new: (req, res) => {
    Category.find({}, (err, cat) => {
      res.render('event/new', {user: req.user, cat: cat})
    })
  },
  list: (req, res) => {
    async.parallel({
      events: (cb) => {
        Event.find({startDate: {$gte: Date.now()}}).sort({startDate: -1}).populate('creator').exec(cb)
      },
      cat: (cb) => {
        Category.find({}).sort({number: -1}).exec(cb)
      }
    }, (err, results) => {
      res.render('event/list', {results: results, user: req.user})
    })
  },
  index: (req, res) => {
    async.parallel({
      events: (cb) => {
        Event.find({startDate: {$gte: Date.now()}}).sort({startDate: -1}).limit(8).populate('creator').exec(cb)
      },
      past_event: (cb) => {
        Event.find({endDate: {$lte: Date.now()}}).populate('creator').exec(cb)
      },
      cat: (cb) => {
        Category.find({}).sort({number: -1}).exec(cb)
      }
    }
    , (err, results) => {
      if (err) {
        req.flash('Could not retreive events.')
        res.redirect('/')
        return
      }
      res.render('event/index', {results: results, user: req.user})
    })
  },
  create: (req, res) => {
    // console.log(req.body.startDate + req.body.startTime);
    Event.create({
      name: req.body.name,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      description: req.body.description,
      category: req.body.category,
      vacancy: req.body.vacancy,
      creator: req.user.id
    }, (err, event) => {
      if (err) {
        req.flash('error', 'Create event not successful.')
        res.redirect('/event/new')
      } else {
        async.parallel({
          participant: (cb) => {
            Participant.create({
              user: req.user.id,
              event: event._id
            }, cb)
          },
          cat: (cb) => {
            Category.findOneAndUpdate({name: req.body.category}, { $inc: {number: 1} }, cb)
          },
          addpic: (cb) => {
            console.log('req.file', req.file)
            if (req.file) {
              cloudinary.uploader.upload(req.file.path, (result) => {
                event.image = result.public_id
                event.save()
                return
              })
            }
            cb()
          }
        }, (err, results) => {
          req.flash('success', `${event.name} has been created.`)
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
          Participant.findOne({user: req.user.id, event: req.params.id}, cb)
        }
      },
      participants: (cb) => {
        Participant.find({event: req.params.id}).populate('user').exec(cb)
      }
    }, (err, results) => {
      if (!results.event) {
        eventController.search(req, res)
        return
      }
      res.render('event/show', {results: results, user: req.user})
    })
  },
  delete: (req, res) => {
    Event.findOne({_id: req.params.id}, (err, event) => {
      if (!event.creator.equals(req.user.id)) {
        req.flash('error', 'Only event owner are able to cancel the event.')
        return res.redirect(`/event/${event._id}`)
      }

      async.parallel([
        (cb) => {
          Participant.remove({event: req.params.id}, cb)
        },
        (cb) => {
          Category.findOneAndUpdate({name: event.category}, {$inc: {number: -1}}, cb)
        },
        (cb) => {
          event.remove()
          cb()
        }
      ], (err) => {
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
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      location: req.body.location,
      description: req.body.description
    }, (err, editedEvent) => {
      res.redirect(`/event/${req.params.id}`)
    })
  },
  search: (req, res) => {
    async.parallel({
      events: (cb) => {
        Event.find({category: req.body.category, startDate: {$gt: Date.now()}}).populate('creator').exec(cb)
      },
      cat: (cb) => {
        Category.find({}, cb)
      }
    }, (err, results) => {
      res.render('event/search', {results: results, user: req.user, searchItem: req.body.category})
    })
  }
}

module.exports = eventController
