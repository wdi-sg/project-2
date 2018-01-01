//
// const User = require('../models/user')


//Index Homepage
exports.index = (req, res)=>{
  //renders views/home.handlebars
  res.render('home')
}

exports.customers = (req, res)=>{
  res.render('customers')
}

exports.stock = (req, res)=>{
  res.render('stock')
}

//index home page
exports.home = (req, res)=>{
  res.render('home')
}
