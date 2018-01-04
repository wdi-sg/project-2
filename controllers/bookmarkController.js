const Bookmark = require('../models/bookmark');

module.exports.add = function(req, res) {
  let newBookmark = new Bookmark({
    title: req.body.title,
    location: req.body.location,
    photo: req.body.photo,
    userId: req.body.userId,
    reviewId: req.params.id
  });

  Bookmark.findOne({reviewId: req.params.id}, function(err, result) {
    if (err) throw err;
    if (result) {
      req.flash('red', 'Bookmark has be added');
      res.redirect('/fullreview/' + req.params.id);
    } else {
      newBookmark.save(function(err) {
        if (err) throw err;
        console.log(newBookmark);
          req.flash('light-blue', 'Bookmark added');
          res.redirect('/fullreview/' + req.params.id);

  });
}

});
};


// module.exports.edit = function(req, res) {
//   res.redirect('base/profile');
// };


module.exports.delete = function(req, res) {
  Bookmark.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) throw err;
    console.log(data);
      res.sendStatus(200);
  });
  // find bookmarkid and delete

};
