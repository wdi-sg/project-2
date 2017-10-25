const isLoggedIn = (req,res, next)=>{
  if(req.user){
     req.flash('error', 'You must be logged in to access that page');
    res.redirect("/")
  }else{
    next()
  }
}

const hasLoggedOut = (req, res, next)=>{
  if(req.user){
    next()
  }else{
    res.redirect("/")
  }
}

module.exports={
  isLoggedIn,
  hasLoggedOut
}
