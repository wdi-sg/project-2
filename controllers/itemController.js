const Item = require('../models/item')


//Index Homepage
exports.index = (req, res)=>{
  Item.find({},(err, items)=>{
    console.log(items)
    if(err) return err

    res.render('items/index', {'items' : items})
  })
}

//new
exports.new = (req, res)=>{
  res.render('items/create')
  // this comes from routes.js -> router.get('/items/new', ItemController.new) //
}
