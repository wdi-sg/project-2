module.exports.like = function(req, res) {
  // find review db for username if no then create
  // if yes flash use that they can only like once
  res.redirect('base/review');
};


module.exports.write = function(req, res) {

  // jquery the page
  // add user and comment to db
  // reload with jquery

  req.flash('blue', 'Added comment');
  // res.sendStatus(200);

  res.redirect('/review');
};


module.exports.delete = function(req, res) {
// jquery the delete with commentid
  // find commentid then delete
  // jquery to reload
  res.sendStatus(200);
};
