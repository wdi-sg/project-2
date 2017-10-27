const User = require('../models/user')
const Medication = require('../models/medications')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  // console.log(req.user.id)
  var userId = req.user.id

  User.findById(userId)
  .populate('userMed')
  .then(user => {
    var medicineArray = user.userMed
    var context = {
      medicines: medicineArray
    }

    // return res.send({
    //   context,
    //   user: req.user
    // })
    res.render('users/profile', context)
  })
})
router.put('/', (req, res, next) => {
  var formData = req.body // target form body
  var user = req.user// target user
  // create new medication schema
  var newMedication = new Medication({
    name: formData.medicine,
    dosage: formData.dosage
  })

  User.findById(user.id)
  .then(user => {
    user.userMed.push(newMedication)

    newMedication.save()
    .then(() => {
      user.save()
      .then(() => res.redirect('/'))
    })
  })

  // router.get('/:id', (req, res) => {
  //   User
  //   .findById(req.params.id)
  //   .populate('userMed')
  //   .then(medication => {
  //     res.render('./users/profile', {
  //       Medication
  //     })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //   })
  // })
})

router.put('/:id', (req, res) => {
  // thankfully since we're using mongoose
  // we don't have to find and update separately
  // there's a method in mongoose just for that
  // `findByIdAndUpdate` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
  console.log('update pressed')
  var formData = req.body
  Medication.findByIdAndUpdate(req.params.id, {
    name: formData.name,
    dosage: formData.dosage
  })
  .then(() => res.redirect('/profile'))
  .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  // (AGAIN) thankfully since we're using mongoose
  // there's a method in mongoose just for that
  // `findByIdAndRemove` http://mongoosejs.com/docs/api.html#model_Model.findByIdAndRemove
  console.log('delete pressed!')
  Medication.findByIdAndRemove(req.params.id)
  .then(() => {
    console.log('deleted')
    // res.redirect('./users/profile')
  })
  .catch(err => console.log(err))
})
// router.get('/', (req, res) => {
//   res.render('./users/profile')
// })

module.exports = router
