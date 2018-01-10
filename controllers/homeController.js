const Position = require('../models/position')
const User = require('../models/user');

//Index Home page
exports.index = (req, res)=>{
    res.render('home')
}

exports.positions = (req, res)=>{
	Position.find({},function(err,result){
		if(err) throw err
			// console.log(result)
		res.render('positions',{position:result})
	})

}

exports.summary = (req, res)=>{
  res.render('summary')
}

//Index Home page
exports.home = (req, res)=>{

    res.render('home')
}
//Users page
// exports.create = (req,res)=>{
//   let newUser = new User({
//     name: req.body.name,
//     email:req.body.email,
//     password:req.body.password
//   })
//   newUser.save(function(err){
//     if(err) throw err
//     User.find({},function(err,result){
//         if(err) throw err
//         // console.log(result)
//         res.redirect('/');
//   })
//
//   })
// }
//Positions page
exports.create = (req, res)=>{
	let newPosition = new Position({
		  name: req.body.name,
  		ticker:  req.body.ticker,
  		units: req.body.units,
  		price: req.body.price,
  		buyDate: req.body.buyDate,
  		

	})

	newPosition.save(function(err){
		if(err) throw err
    Position.find({},function(err,result){
        if(err) throw err
        // console.log(result)
        res.redirect('/positions');
  })

	})
//   Position.find({},function(err,result){
//       if(err) throw err
//       console.log(result)
//       res.render('positions', {position:result});
// });
}
exports.remove= (req,res)=>{
  Position.findByIdAndRemove(req.params.id, function(err){
    if (err) throw err
    res.redirect('/positions')
  })
}



//Updates page
exports.update = (req, res)=>{
  Position.findById(req.params.id, function(err, result) {
    // return res.send(result)
    // if(err) console.log(err)
    // console.log(result);
      res.render('update', {data: result})
  });

}





// name: String,
//   ticker:  String,
//   units: Number,
//   price: Number,
//   buyDate: String,
//   sellDate: String,
//   closingPrice: Number,
//   user: [{
//   type: Schema.Types.ObjectId,
//   ref: 'User'


// name: String,
//   ticker:  String,
//   units: Number,
//   price: Number,
//   buyDate: String,
//   sellDate: String,
//   closingPrice: Number,
//   user: [{
//   type: Schema.Types.ObjectId,
//   ref: 'User'
