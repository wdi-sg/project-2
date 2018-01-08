const User = require('../models/user')
const Announcement = require('../models/announcement')

exports.index = (req, res) => {
    res.render('welcome', { user : req.user })
}

exports.home = (req, res) => {
  Announcement.find({}, (err, announcements) => {
    if(err) return err
    res.render('home', { user : req.user, 'announcements' : announcements })
  })
    // res.render('home', { user : req.user, 'announcements' : announcements })
}

exports.create = (req, res) => {
  req.checkBody('content', 'Content field is empty or too long.').notEmpty().isLength({ max: 50})

  let errors = req.validationErrors()
  console.log(errors);
  if(errors){
    req.flash('errorMessage', 'Could not create announcement')
    res.redirect('/home')
  }
  else{
    Announcement.create({
      content : req.body.content,
      postedBy : req.user.displayName
    }, (err, createdAnnouncement) => {
      if(err){
        req.flash('error', 'Could not create announcement')
        req.redirect('home', { user: req.user })
      }
      else{
          res.redirect('/announce')
      }
    })
  }
}

exports.getedit = (req, res) => {
  let id = { _id : req.params.id }
  console.log(id)

  Announcement.findOne(id, (err, announcements) => {
    if(err) return err
    res.render('edit', { user : req.user, 'announcements' : announcements })
  })
}

exports.postedit = (req, res) => {
  let id = { _id : req.params.id }
  let formcontent = req.body.content

  Announcement.updateOne(id, {$set: {content: formcontent}}, (err, data) => {
    if(err) return err

    res.redirect("/announce")
  })
}

exports.delete = (req, res) => {
  let id = { _id : req.params.id }
  let uid = { _id : req.user.id }
  console.log(uid)
  Announcement.deleteOne(id, (err, result) => {
    if(err){
      return err
    }
    else{
      res.sendStatus(200)
    }
  })
  User.deleteOne(uid, (err, result) => {
    if(err){
      return err
    }
    else{
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
