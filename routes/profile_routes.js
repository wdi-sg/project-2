const User = require('../models/user')
const Medication = require('../models/medications')
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  var userId = req.user.id

  User.findById(userId)
  .populate('userMed')
  .then(user => {
    var medicineArray = user.userMed
    var context = {
      medicines: medicineArray
    }

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
      .then(() => res.redirect('/profile'))
    })
  })
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
  Medication.findByIdAndRemove(req.params.id)
  .then((result) => {
    console.log('deleted')
    res.redirect('/profile')
  })
  .catch(err => console.log(err))
})

module.exports = router
