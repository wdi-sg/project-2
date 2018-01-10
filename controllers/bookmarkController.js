const Bookmark = require('../models/bookmark');



module.exports.add = function(req, res) {
  let isFound = false;

  let newBookmark = new Bookmark({
    title: req.body.title,
    location: req.body.location,
    photo: req.body.photo,
    userId: req.body.userId,
    reviewId: req.params.id
  });

  Bookmark.find({
    userId: req.body.userId
  }, function(err, result) {
    if (err) throw err;
    result.forEach(function(item) {
      if (item.reviewId.equals(req.params.id)) {
        isFound = true;
      }
    });
    
    if (isFound) {
      req.flash('red', 'Bookmark has be added');
      res.redirect('/fullreview/' + req.params.id);
    } else {
      newBookmark.save(function(err) {
        if (err) throw err;
        req.flash('light-blue', 'Bookmark added');
        res.redirect('/fullreview/' + req.params.id);
      });
    }
  });

};



module.exports.delete = function(req, res) {
  Bookmark.findByIdAndRemove(req.params.id, function(err, data) {
    if (err) throw err;
    console.log(data);
    res.sendStatus(200);
  });
};
