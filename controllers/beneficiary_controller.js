const Beneficiary = require('../models/beneficiary')
const User = require('../models/user')

let beneficiaryController = {
  new: function (req, res) {
    res.render('beneficiary/new')
  },

  signup: function (req, res) {
    let newBeneficiary = new Beneficiary({
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      guardian: req.user.id
    })
    newBeneficiary.save(function (err, savedBeneficiary) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/beneficiary/new')
      } else {
        User.findById(req.user.id, function (err, user) {
          user.signedTheseBeneficiariesUp.push(savedBeneficiary._id)
          user.save()
        })
        res.redirect('/profile/' + req.user.id)
      }
    })
  }
}

module.exports = beneficiaryController
