const User = require("../models/user")

router.post("/signup", function(req, res) {
  User.create(
    {
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    },
    function(err, createdUser) {
      if (err) {
        console.log("An error occurred: " + err)
        res.redirect("/auth/signup")
      } else {
        res.redirect("/")
      }
    }
  )
})
