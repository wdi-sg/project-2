// check if user is logged in and if user is trying to access other users page
exports.isLoggedIn = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Access denied');
    res.redirect('/login');
  } else if (req.user) {
    if (res.locals.currentUser._id != req.params.id) {
      req.flash('error', 'Access denied');
      res.redirect('/login');
    } else {
      next();
    }
  } else {
    next();
  }
};
