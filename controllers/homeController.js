const Item = require('../models/item')
const Customer = require('../models/customer')


//Index Homepage
exports.index = (req, res)=>{

  // res.send('books/index')
  Item.find({},(err, items)=>{
    // console.log(items)
    if(err) return err

    Customer.find({},(err, customers)=>{
      // console.log(customers)
      if(err) return err

      res.render('home', {'items' : items, 'customers' : customers})
    });
  //This renders views/home.handlebars
});
};

// exports.customers = (req, res)=>{
//   res.render('customers')
// }

exports.customers = (req, res)=>{
  res.render('customers/index')
  //This should render views/customers/index.handlebars
}

exports.items = (req, res)=>{
  res.render('items/index')
  //This should render views/items/index.handlebars
}

exports.order = (req, res)=>{
  console.log(req.body);
  // res.redirect('/')
}
