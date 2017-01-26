const User = require('../models/user')

let profileController = {
  list: function (req, res) {
    User.findOne({ _id: req.user.id })
      .populate('createdPrograms')
      .populate('signedTheseBeneficiariesUp')
      .populate('signedBeneficiariesUpToThesePrograms')
      .exec(function (err, user) {
        if (err) throw err
        res.render('profile', {
          createdProgramsPopulated: user.createdPrograms,
          signedTheseBeneficiariesUpPopulated: user.signedTheseBeneficiariesUp,
          signedBeneficiariesUpToTheseProgramsPopulated: user.signedBeneficiariesUpToThesePrograms
        })
      })
  }

}

module.exports = profileController
