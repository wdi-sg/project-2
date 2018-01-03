const Item = require('../models/item')


//Index Homepage
exports.index = (req, res)=>{
  Item.find({},(err, items)=>{
    console.log(items)
    if(err) return err

    console.log("hello!")
    res.render('items/index', {'items' : items})
  })
}






//new
exports.new = (req, res)=>{

  let items = new Item()
    items.name = req.body.name
    items.price = req.body.price
    items.total_stock = req.body.total_stock


  console.log(items)
  res.render('items/index', items)

  // res.render('items/create')

  // this comes from routes.js -> router.get('/items/new', ItemController.new) //

}
