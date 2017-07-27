const Episode = require ('../models/Episodes')
const findOrCreate = require('mongoose-findorcreate')

function create (req, res) {
  var newEpisode = new Episode ({
    name: req.body.name,
    id: req.body.id,
    season: req.body.season,
    episode: req.body.episodeNum,
    user: req.user.id
  })

  newEpisode.save(function (err, savedEpisode) {
    if (err) return res.send(err)

    res.send(savedEpisode)
  })
}

module.exports = {
  create
}
