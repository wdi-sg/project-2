module.exports = function (req, res, next) {
    if (!req.user) {
      req.flash("error", "You must log in to access page")
      res.redirect("/users/login")

    } else {
      next()
    }
  };

// var attempt = 3; function validateForm()
// var email = document.getElementById("email").value;
// var password = document.getElementById("password").value;
//
// if (email === "email" && password == "password") {
//   alert ("Logged In");
//   window.location = "success.html";
//   return false;
// }
// else {
// attempt --;
// alert ("You have left "+attempt+" attempt;");
//
// if (attempt === 0) {
//   document.getElementById("email").disabled = true;
//   document.getElementById("password").disabled = true;
//   return false;
// }
// }
