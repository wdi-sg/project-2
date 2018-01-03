const Customer = require('../models/customer')


//Index Homepage
exports.index = (req, res)=>{
  Customer.find({},(err, customers)=>{
    console.log(customers)
    if(err) return err

    res.render('customers/index', {'customers' : customers})
  })
}

//new
exports.new = (req, res)=>{
  res.render('customers/create')
  // this comes from routes.js -> router.get('/items/new', ItemController.new) //
}
