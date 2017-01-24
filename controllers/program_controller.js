let Program = require('../models/program')
let User = require('../models/user')

let programController = {
  listAll: function (req, res) {
    Program.find({}, (err, allPrograms) => {
      if (err) throw err
      res.render('program/index', { allPrograms: allPrograms })
    })
  },

  listOwn: function (req, res) {
    User.findOne({ _id: req.user.id })
      .populate('createdPrograms')
      .exec((err, user) => {
        if (err) throw err
        res.render('program/own', { createdPrograms: user.createdPrograms })
      })
  },

  listOne: function (req, res) {
    Program.findById(req.params.id, (err, chosenProgram) => {
      if (err) throw err
      res.render('program/single', { chosenProgram: chosenProgram })
    })
  },

  new: function (req, res) {
    res.render('program/create')
  },

  create: function (req, res) {
    let newProgram = new Program({
      name: req.body.name,
      subject: req.body.subject,
      description: req.body.description,
      website: req.body.website,
      imageURL: req.body.imageURL || 'https://source.unsplash.com/random',
      commitment: {
        daily: (req.body.commitmentDaily === 'true') || false,
        weekly: (req.body.commitmentWeekly === 'true') || false,
        fortnightly: (req.body.commitmentFortnightly === 'true') || false,
        monthly: (req.body.commitmentMonthly === 'true') || false,
        quarterly: (req.body.commitmentQuarterly === 'true') || false
      },
      admin: req.user.id
    })
    newProgram.save(function (err, savedProgram) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/program/new')
      } else {
        User.findById(req.user.id, (err, user) => {
          user.createdPrograms.push(savedProgram._id)
          user.save()
        })
        res.redirect('/program/')
      }
    })
  },

  edit: function (req, res) {
    Program.findById(req.params.id, function (err, chosenProgram) {
      if (err) throw err
      res.render('program/edit', { chosenProgram: chosenProgram })
    })
  },

  update: function (req, res) {
    Program.findOneAndUpdate({
      _id: req.params.id
    }, {
      name: req.body.name,
      subject: req.body.subject,
      description: req.body.description,
      website: req.body.website,
      imageURL: req.body.imageURL || 'https://source.unsplash.com/random',
      commitment: {
        daily: (req.body.commitmentDaily === 'true') || false,
        weekly: (req.body.commitmentWeekly === 'true') || false,
        fortnightly: (req.body.commitmentFortnightly === 'true') || false,
        monthly: (req.body.commitmentMonthly === 'true') || false,
        quarterly: (req.body.commitmentQuarterly === 'true') || false
      }
    }, function (err, chosenProgram) {
      if (err) throw err
      req.flash('success', 'Program successfully updated!')
      res.redirect('/program/' + chosenProgram.id)
    })
  },

  delete: function (req, res) {
    Program.findByIdAndRemove(req.params.id, function (err, chosenProgram) {
      if (err) throw err
      req.flash('success', 'Program successfully deleted')
      res.redirect('/program')
    })
  }

}

module.exports = programController
