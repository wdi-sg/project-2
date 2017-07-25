const User = require('../models/User')

function signUp (req, res) {
  var newUser = new User({
    name: req.body.user.name,
    email: req.body.user.email,
    password: req.body.user.password
  })

  console.log(newUser)

  newUser.save(function (err, createdUser) {
    console.log('a')
    if (err) {
      console.log('b')
      return res.send(err)
    }
    req.login(createdUser, function(err) {
      if (err) {
        console.log('error from req.login(createdUser, error)')
      } else {
        return res.redirect('/home')        
      }
    })
  })
    //return createdUser
    //console.log('New user created successfully. Directing to portfolio home...')
    //res.redirect('/home') // to show user name in portfolios

//{userDisplayName: req.user.name}

}

//, { userDisplayName: req.body.user.displayName }

// function signIn (req, res) {
//   // find the user by email
//   User
//   .findOne({
//     email: req.body.user.email
//   })
//   .exec(function (err, foundUser) {
//     if (err) return res.send(err)

//     const formPassword = req.body.user.password

//     if (foundUser.validPassword(formPassword)) {
//       res.send('valid, redirect to home')
//     } else {
//       res.send('invalid, show flash message')
//     }
//   })

//   // User.valid(req.body.user.password) // returns true or false
// }

module.exports = {
  signUp
  //,
  //signIn
}
