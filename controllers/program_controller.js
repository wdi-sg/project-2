const Program = require('../models/program')
const User = require('../models/user')
const Beneficiary = require('../models/beneficiary')

let programController = {
  listAll: function (req, res) {
    Program.find({}, function (err, allPrograms) {
      if (err) throw err
      res.render('program/index', { allPrograms: allPrograms })
    })
  },

  listOne: function (req, res) {
    Program.findById(req.params.id, function (err, chosenProgram) {
      if (err) throw err
      Program.findById(req.params.id)
        .populate('beneficiaries')
        .exec(function (err, program) {
          if (err) throw err
          res.render('program/single', {
            chosenProgram: chosenProgram,
            programBeneficiaries: program.beneficiaries
          })
        })
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
        User.findById(req.user.id, function (err, user) {
          user.createdPrograms.push(savedProgram._id)
          user.save()
        })
        res.redirect('/program/')
      }
    })
  },

  adminEdit: function (req, res) {
    Program.findById(req.params.id, function (err, chosenProgram) {
      if (err) throw err
      res.render('program/adminEdit', { chosenProgram: chosenProgram })
    })
  },

  adminUpdate: function (req, res) {
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
    }, { runValidators: true }, function (err, chosenProgram) {
      if (err) {
        req.flash('error', err.toString())
        res.redirect('/program/adminEdit/' + req.params.id)
      } else {
        req.flash('success', 'Program successfully updated!')
        res.redirect('/program/' + chosenProgram.id)
      }
    })
  },

  guardianNewB: function (req, res) {
    Program.findById(req.params.id, function (err, chosenProgram) {
      if (err) throw err
      User.findById(req.user.id)
        .populate('signedTheseBeneficiariesUp')
        .exec(function (err, user) {
          if (err) throw err
          res.render('program/guardianNewB', {
            chosenProgram: chosenProgram,
            beneficiariesOfUser: user.signedTheseBeneficiariesUp
          })
        })
    })
  },

  guardianAddB: function (req, res) {
    // Program.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { beneficiaries: req.body['signedUpBeneficiaryID[]'], guardians: req.user.id } }, { runValidators: true }, function (err, chosenProgram) {
    // avoid the above approach as it will cause an array of the beneficiaries' IDs to be pushed into the beneficiaries array in the program!
    // adding one beneficiary at a time would avoid this and $addToSet could be used to ensure unique IDs
    // checkboxes of unknown length present complications
    Program.findById(req.params.id, function (err, chosenProgram) {
      if (req.body['signedUpBeneficiaryID[]'] instanceof Array) {
        req.body['signedUpBeneficiaryID[]'].forEach(function (input) {
          if (chosenProgram.beneficiaries.every(function (indivBeneficiary) {
            return indivBeneficiary.toString() !== input
          })) {
            chosenProgram.beneficiaries.push(input)
          }
          if (chosenProgram.guardians.every(function (indivGuardian) {
            return indivGuardian.toString() !== req.user.id
          })) {
            chosenProgram.guardians.push(req.user.id)
          }
        })
      } else {
        if (chosenProgram.beneficiaries.every(function (indivBeneficiary) {
          return indivBeneficiary.toString() !== req.body['signedUpBeneficiaryID[]']
        })) {
          chosenProgram.beneficiaries.push(req.body['signedUpBeneficiaryID[]'])
        }
        if (chosenProgram.guardians.every(function (indivGuardian) {
          return indivGuardian.toString() !== req.user.id
        })) {
          chosenProgram.guardians.push(req.user.id)
        }
      }
      chosenProgram.save()
      if (err) {
        // unique validator at Program.beneficiaries does not prevent repeats
        req.flash('error', err.toString())
        res.redirect('/program/guardianNewB/' + chosenProgram.id)
      } else {
        Beneficiary.update({ _id: { $in: req.body['signedUpBeneficiaryID[]'] } }, { $addToSet: { programs: chosenProgram.id } }, { multi: true, runValidators: true }, function (err, chosenBeneficiaries) {
          if (err) {
            // $addToSet precludes repetition, rendering schema validation for unique objects redundant
            req.flash('error', err.toString())
            res.redirect('/program/guardianNewB/' + chosenProgram.id)
          } else {
            User.findOneAndUpdate({ _id: req.user.id }, { $addToSet: { signedBeneficiariesUpToThesePrograms: chosenProgram.id } }, { runValidators: true }, function (err, guardianUser) {
              if (err) {
                // $addToSet precludes repetition, rendering schema validation for unique objects redundant
                req.flash('error', err.toString())
                res.redirect('/program/guardianNewB/' + chosenProgram.id)
              } else {
                req.flash('success', 'Successful sign up!')
                res.redirect('/program/' + chosenProgram.id)
              }
            })
          }
        })
      }
    })
  },

  adminDelete: function (req, res) {
    Program.findByIdAndRemove(req.params.id, function (err, chosenProgram) {
      if (err) throw err
      User.findById(req.user.id, function (err, user) {
        if (err) throw err
        user.createdPrograms.splice(user.createdPrograms.indexOf(chosenProgram._id), 1)
        user.save()
      })
      Beneficiary.update({ _id: { $in: chosenProgram.beneficiaries } }, { $pull: { programs: chosenProgram.id } }, { multi: true }, function (err, chosenBeneficiaries) {
        if (err) throw err
        User.update({ _id: { $in: chosenProgram.guardians } }, { $pull: { signedBeneficiariesUpToThesePrograms: chosenProgram.id } }, { multi: true }, function (err, chosenGuardians) {
          if (err) throw err
          req.flash('success', 'Program successfully deleted')
          res.redirect('/profile')
        })
      })
    })
  },

  guardianDelete: function (req, res) {
    Program.findById(req.params.id, function (err, chosenProgram) {
      chosenProgram.beneficiaries.splice(chosenProgram.beneficiaries.indexOf(req.body.id), 1)
      if (err) throw err
      chosenProgram.save()
      console.log('The beneficiary\'s ID sent from the form is ' + req.body.id)
      console.log('The program\'s ID to be pulled from the beneficiary is ' + chosenProgram.id)
      Beneficiary.findByIdAndUpdate(req.body.beneficiaryToDelete, { $pull: { programs: chosenProgram.id } }, { new: true }, function (err, chosenBeneficiary) {
        if (err) throw err
        Program.findById(req.params.id)
          .populate('beneficiaries')
          .exec(function (err, chosenProgram) {
            chosenProgram.guardians.forEach(function (individualGuardianID) {
              if (chosenProgram.beneficiaries.every(function (indivBeneficiary) {
                return indivBeneficiary.guardian.toString() !== individualGuardianID.toString()
              })) {
                chosenProgram.guardians.splice(chosenProgram.guardians.indexOf(individualGuardianID), 1)
                if (err) throw err
                chosenProgram.save()
                console.log('The ID of the guardian whose programs array should now remove the program\'s ID is ' + individualGuardianID)
                console.log('The program\'s ID to be pulled from the guardian\'s programs array is ' + chosenProgram.id)
                User.findByIdAndUpdate(individualGuardianID, { $pull: { signedBeneficiariesUpToThesePrograms: chosenProgram.id } }, { new: true }, function (err, chosenGuardian) {
                  if (err) throw err
                })
              }
              req.flash('success', 'Beneficiary successfully removed')
              res.redirect('/program/' + chosenProgram.id)
            })
          })
      })
    })
  }

}

module.exports = programController
