//------ Get Login Page -----
exports.login = (req, res) => {
    res.render("auth/login")
};


//------ Get Logout Page -----
exports.logout = (req, res) => {
    req.logout()
    req.flash("You are logged out!")
    redirect("auth/login")
};



//------ Get Register Page -----
exports.register = (req, res) => {
    res.render("auth/register")
};
