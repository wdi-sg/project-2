const Bookmark = require('../models/bookmark');

module.exports.add = function(req, res) {
  // place reviewid on bookmark link
  // title
  // location
  // photo
  // userid
  // reviewid

  // add to db
  // let newBookmark = new Bookmark({
  //
  // })
console.log(req.body);
  req.flash('light-blue', 'Bookmark added');
  res.redirect('/fullreview/' + req.params.id);
};


// module.exports.edit = function(req, res) {
//   res.redirect('base/profile');
// };


module.exports.delete = function(req, res) {
  // find bookmarkid and delete
  res.sendStatus(200);
};
