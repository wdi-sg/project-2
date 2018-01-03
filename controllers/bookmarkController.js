const Bookmark = require('../models/bookmark');

module.exports.add = function(req, res) {
  // place reviewid on bookmark link
  // title
  // location
  // photo
  // userid
  // reviewid
  let newBookmark = new Bookmark({
    title: req.body.title,
    location: req.body.location,
    photo: req.body.photo,
    userId: req.body.userId,
    reviewId: req.params.id
  });

  // add to db
  // let newBookmark = new Bookmark({
  //
  // })
console.log(newBookmark);
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
