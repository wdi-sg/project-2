
// const User = require('../models/user');

//Index Home page
exports.index = (req, res)=>{
    res.render('home')
}

exports.positions = (req, res)=>{
  res.render('positions')
}

exports.summary = (req, res)=>{
  res.render('summary')
}

//Index Home page
exports.home = (req, res)=>{

    res.render('home')
}
