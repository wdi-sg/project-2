const Announcement = require('../models/announcement')

exports.home = (req, res) => {
  Announcement.find({}, (err, announcements) => {
    if (err) return err
    res.render('home', { user : req.user, 'announcements' : announcements })
  })
}

exports.create = (req, res) => {
  req.checkBody('content', 'Content field is too long.').isLength({ max: 80 })

  let errors = req.validationErrors()
  console.log(errors)
  if (errors) {
    res.redirect('/announce')
  }
  else {
    Announcement.create({
      content : req.body.content,
      postedBy : req.user.displayName
    }, (err, createdAnnouncement) => {
      if (err) {
        req.redirect('/announce', { user: req.user })
      }
      else {
        res.redirect('/announce')
      }
    })
  }
}

exports.getedit = (req, res) => {
  let id = { _id : req.params.id }
  Announcement.findOne(id, (err, announcements) => {
    if (err) return err
    res.render('edit', { user : req.user, 'announcements' : announcements })
  })
}

exports.postedit = (req, res) => {
  let id = { _id : req.params.id }
  let formcontent = req.body.content

  Announcement.updateOne(id, {$set: {content: formcontent}}, (err, data) => {
    if (err) return err
    res.redirect('/announce')
  })
}

exports.delete = (req, res) => {
  let id = { _id : req.params.id }
  Announcement.deleteOne(id, (err, result) => {
    if (err) {
      return err
    }
    else {
      res.sendStatus(200)
    }
  })
}

exports.announce = (req, res) => {
  Announcement.find({}, (err, announcements) => {
    if(err) return err
    res.render('announcements', { user : req.user, 'announcements' : announcements })
  })
}
