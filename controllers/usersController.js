const User = require('../models/User')
const Portfolio = require('../models/Portfolio')
const homeController = require('../controllers/homeController')

function signUp (req, res) {
  
  var newPortfolio = new Portfolio({
    name: 'My Portfolio'
  })

  console.log('aaa ', newPortfolio)

  newPortfolio.save(function (err, createdPortfolio) {

    console.log('bbb ', createdPortfolio)

    var newUser = new User({
      name: req.body.user.name,
      email: req.body.user.email,
      password: req.body.user.password,
      portfolio: [createdPortfolio.id]
    })

    console.log(newUser)

    newUser.save(function (err, createdUser) {
      //console.log('a')
      if (err) {
        //console.log('b')
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
  }) 
}

module.exports = {
  signUp
  //,
  //signIn
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

