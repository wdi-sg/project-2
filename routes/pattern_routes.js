const passport = require('../config/ppConfig')
const User = require('../models/user')
const Pattern = require('../models/pattern')
const Project = require('../models/project')
const express = require('express')
const router = express.Router()
const { hasLoggedOut, isLoggedIn, isNotLoggedIn } = require('../helpers')

const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })


router.get('/new', isNotLoggedIn, (req, res) => {
  res.render('pattern/new')
})

router.post('/new', upload.single('image'), (req, res) => {

  const userData = req.user
  const userId = userData.id
  const userPattern = userData.pattern
  const patternData = req.body.pattern
  cloudinary.uploader.upload(req.file.path, function(result) {
    let newPattern = new Pattern({
      title : patternData.title,
      creator : userId,
      category : patternData.category,
      material : patternData.material,
      steps : patternData.steps,
      imageUrl : result.secure_url
    })
    newPattern.save()
    .then(pattern => {
      console.log('success')
      res.redirect(`/pattern/${pattern.id}`)
    }, err => res.direct('/pattern/new'))
  })

})

router.get('/:id', (req, res) => {
  const patternId = req.params.id
  Pattern.findById(patternId)
  .populate('creator')
  .then(pattern => {
    let dateTime = pattern.created.toString().replace(/[GMT+].*/g,'')
    if (req.user) {
      let userBookmark = req.user.bookmark
      let notBookmark = true
      let userBookmarkId =""
      for (var i = 0; i < userBookmark.length; i++) {
        userBookmarkId = userBookmark[i].toString()
        if(userBookmarkId === patternId){
          notBookmark = false
        }
      }
      let userMatch = (pattern.creator.id === req.user.id)
      Project.find({pattern : patternId})
      .then(variations => {
        res.render('pattern/details', {
          pattern, userMatch, variations, notBookmark, dateTime
        })
      })
    })
    .catch(err => res.send(err))
  } else {
    Project.find({pattern : patternId})
    .then(variations => {
      res.render('pattern/details', {
        pattern, variations, dateTime
      })
    })
  }
})


router.get('/:id/edit', isNotLoggedIn, (req, res) => {

  Pattern.findById(req.params.id)
  .populate('creator')
  .then(pattern => {
    if (pattern.creator.id === req.user.id){
      res.render('pattern/edit', {
        pattern
      })
    }
    else res.redirect('/')
  })
})

router.put('/:id/edit', upload.single('image'), (req, res) => {
  const newPatternData = req.body.pattern
  const patternId = req.params.id
  // console.log(req.body)
  cloudinary.uploader.upload(req.file.path, function(result) {
    Pattern.findById(patternId)
    .then(currentPattern => {
      //console.log(result)
      let toUpdate = {
        title : newPatternData.title || currentPattern.title,
        material : newPatternData.material || currentPattern.material,
        steps:  newPatternData.steps || currentPattern.steps ,
        imageUrl : result.secure_url
      }

      Pattern.findByIdAndUpdate(patternId, toUpdate)
      .then(() => res.redirect(`/pattern/${patternId}`))
      .catch(err => res.send(err))
    })
  })
})

router.delete('/:id/edit', isNotLoggedIn, (req, res) => {
  const patternId = req.params.id
  Pattern.findById(req.params.id)
  .populate('creator')
  .then(pattern => {

    if (pattern.creator.id === req.user.id){
      const editedPatternTitle = "(removed) " + pattern.title
      let toUpdate = {
        title : editedPatternTitle,
        material : "",
        steps: "",
        imageUrl : "http://res.cloudinary.com/hqxmir9qs/image/upload/v1509874538/500x500placeholder_xy64yy.jpg"
      }
      Pattern.findByIdAndUpdate(patternId, toUpdate)
      .then(() => {
        res.redirect(`/home`)
    })
    .catch(err => res.send(err))
  }
  else res.redirect(`/pattern/${patternId}`)
  })
})
router.get('/:id/variation/new', isNotLoggedIn, (req,res) => {
  const patternId = req.params.id
  User.findById(req.user.id)
  .then(user => {
    let userBookmark = user.bookmark
    let eachBookmark = ""
    let hasBookmark = false
    for (var i = 0; i < userBookmark.length; i++) {
      eachBookmark = userBookmark[i].toString()
      if (eachBookmark === patternId) {
        hasBookmark = true
      }
    }
    Pattern.findById(req.params.id)
    .then(pattern => {
      res.render('pattern/variation', {
        pattern, hasBookmark
      })
    })
  })
})

router.post('/:id/variation/new', upload.single('image'), (req, res) => {
  const userData = req.user
  const userId = userData.id
  const userProject = userData.project
  const removeBookmark = req.body.removeBookmark
  const patternId = req.params.id
  const projectData = req.body.project
  let projectTitle = projectData.title
  Pattern
  .findById(patternId)
  .then(pattern => {
    const projectCategory = pattern.category
    cloudinary.uploader.upload(req.file.path, function(result) {
      let newProject = new Project({
        title : projectTitle,
        creator : userId,
        category : projectCategory,
        material : projectData.material,
        reflection : projectData.reflection,
        pattern : patternId,
        imageUrl : "http://res.cloudinary.com/hqxmir9qs/image/upload/v1509874538/500x500placeholder_xy64yy.jpg"
      })

      newProject.save()
      .then(project => {

        if (removeBookmark === 'yes'){
          User.findById(req.user.id )
          .then((user) => {
            let userBookmark = user.bookmark
            let  userBookmarkId =''
            let bookmarkIndex = 2
            for (var i = 0; i < userBookmark.length; i++) {
              userBookmarkId = userBookmark[i].toString()
              if (userBookmarkId === patternId){
                bookmarkIndex = i
              }
            }
            userBookmark.splice(bookmarkIndex,1)
            User.findByIdAndUpdate(req.user.id, {
              bookmark : userBookmark
            })
            .then(() => res.redirect(`/project/${project.id}`))
            .catch((err) => res.send(err))
          })
        }

        else res.redirect(`/project/${project.id}`)
      }, err => res.send(err))
    })
  })
  .catch(err => console.log('findpattern by id error'))
})

router.post('/:id/bookmark', isNotLoggedIn, (req, res) => {
  const userId = req.user.id
  const patternId = req.params.id
  let userBookmark = req.user.bookmark
  let notBookmark = true
  for (var i = 0; i < userBookmark.length; i++) {
    if(userBookmark[i].id === patternId){
      notBookmark = false
    }
  }
  if(notBookmark){
    User.findById(userId)
    .then(user => {

      let userBookmark = user.bookmark
      const patternId = req.params.id

      userBookmark.push(patternId)

      User.findByIdAndUpdate(userId, {
        bookmark : userBookmark
      })
      .then(() => {
        res.redirect(`/pattern/${patternId}`)
      }, (err) => console.log(err))
    })
  } else {
    res.redirect(`/pattern/${patternId}`)
  }
})
router.put('/:id/bookmark', isNotLoggedIn, (req, res) => {
  const patternId = req.params.id
  User.findById(req.user.id )
  .then((user) => {
    let userBookmark = user.bookmark
    let  userBookmarkId =''
    let bookmarkIndex = 2
    for (var i = 0; i < userBookmark.length; i++) {
      userBookmarkId = userBookmark[i].toString()
      if (userBookmarkId === patternId){
        bookmarkIndex = i
      }
    }
    userBookmark.splice(bookmarkIndex,1)
    User.findByIdAndUpdate(req.user.id, {
      bookmark : userBookmark
    })
    .then(() => res.redirect('/profile'))
    .catch((err) => res.send(err))
  })
})

module.exports = router
