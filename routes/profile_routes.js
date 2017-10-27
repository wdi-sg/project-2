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

router.put('/update', (req, res) => {
  var formData = req.body
  Medication.findByIdAndUpdate(formData.medId, {
    name: formData.name,
    dosage: formData.dosage
  })
  .then(() => res.redirect('/profile'))
  .catch(err => console.log(err))
})

router.delete('/:id', (req, res) => {
  Medication.findByIdAndRemove(req.params.id)
  .then((result) => {
    res.redirect('/profile')
  })
  .catch(err => console.log(err))
})

module.exports = router
