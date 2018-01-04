// check if user is logged in
module.exports = function(req, res, next) {
  if (!req.user) {
    req.flash('error', 'Access denied');
    res.redirect('/login');
  } else {
    next();
  }
};
