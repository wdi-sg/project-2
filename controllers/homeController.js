const User = require('../models/user');

// ----- Home Index -----
exports.index = (req, res) => {
    res.render('home')
}
