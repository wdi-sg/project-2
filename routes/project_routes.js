const passport = require('../config/ppConfig')
const User = require('../models/user')
const Pattern = require('../models/pattern')
const Project = require('../models/project')
const express = require('express')
const router = express.Router()

const cloudinary = require('cloudinary')
const multer = require('multer')
const upload = multer({ dest: './uploads/' })

const { isNotLoggedIn } = require('../helpers/index')


// considering creating individual projects
// router.get('/new', (req, res) => {
//   res.render('project/new')
// })

// router.post('/new', (req, res) => {
//   const userData = req.user
//   const userId = userData.id
//   const userPattern = userData.project
//   const patternData = req.body.project
//   let newPattern = new Pattern({
//     title : patternData.title,
//     creator : userId,
//     category : patternData.category,
//     material : patternData.material,
//     steps : patternData.steps
//   })
//   newPattern.save()
//   .then(pattern => {
//     userPattern.push(pattern.id)
//     User.findByIdAndUpdate(userId, {
//       pattern : userPattern
//     })
//     .then(() => {
//       console.log('User successfully updated')
//
//       res.redirect(`/`) //   res.redirect(`/${patternData.category}/${pattern.id}`)
//     })
//     .catch(err => console.log('Update failed'))
//   }, err => res.send(err))
// })

router.get('/:id', (req, res) => {
  const projectId = req.params.id
  Project.findById(projectId)
  .populate('creator')
  .populate('pattern')
  .then(project => {
    let dateTime = project.created.toString().replace(/[GMT+].*/g,'')
    let projectPatternExist = project.pattern
    if (req.user) {
      var userMatch = (project.creator.id === req.user.id)
      res.render('project/details', {
        project, userMatch, dateTime, projectPatternExist
      })

    } else {
      res.render('project/details', {
        project, dateTime, projectPatternExist
      })
    }
  })
  .catch(err => res.send(err))
})
///

router.get('/:id/edit', isNotLoggedIn, (req, res) => {

  Project.findById(req.params.id)
  .populate('creator')
  .then(project => {
    if (project.creator.id === req.user.id){
      res.render('project/edit', {
        project
      })// can pass in pattern infor
    }
    else res.redirect('/')
  })
})

router.put('/:id/edit',  upload.single('image'), (req, res) => {
  const newProjectData = req.body.project
  const projectId = req.params.id
  cloudinary.uploader.upload(req.file.path, function(result) {
    Project.findByIdAndUpdate(projectId, {
      title : newProjectData.title,
      material : newProjectData.material,
      reflection: newProjectData.reflection,
      imageUrl : result.secure_url

    })
    .then(() => res.redirect(`/project/${projectId}`))
    .catch(err => res.send(err))

  })
})
router.delete('/:id/edit', (req, res) => {
  const projectId = req.params.id
  Project.findById(req.params.id)
  .populate('creator')
  .then(project => {

    if (project.creator.id === req.user.id){

      Project.findByIdAndRemove(projectId)
      .then(() => {
        User.findById(project.creator.id)
        .then(user => {
           // object
          let projectArray = user.project
           //object
          // find the position of the project in the project array
        })
        .catch(err => res.send(err))

        // User.findByIdAndUpdate(pattern.creator.id, {
        //
        // })



        res.redirect(`/home`)
      })
      .catch(err => res.send(err))
    }
    else res.redirect(`/project/${projectId}`)
  })
})




module.exports = router
