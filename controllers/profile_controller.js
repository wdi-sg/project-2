const User = require('../models/user')

let profileController = {
  list: function (req, res) {
    User.findOne({ _id: req.params.id })
      .populate('createdPrograms')
      .populate('signedTheseBeneficiariesUp')
      .populate('signedBeneficiariesUpToThesePrograms')
      .populate('joinedPrograms')
      .exec(function (err, user) {
        if (err) throw err
        res.render('profile', {
          user: user,
          createdProgramsPopulated: user.createdPrograms,
          signedTheseBeneficiariesUpPopulated: user.signedTheseBeneficiariesUp,
          signedBeneficiariesUpToTheseProgramsPopulated: user.signedBeneficiariesUpToThesePrograms,
          joinedProgramsPopulated: user.joinedPrograms
        })
      })
  }

}

module.exports = profileController
