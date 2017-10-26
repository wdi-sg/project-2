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

const isAdmin = (req, res, next)=>{
  if(req.user === undefined || req.user.type !== "admin" ){
    req.flash("error", "You are not authorized to access that page, please contact your system administrator for more information")
    res.redirect("/")
  }else{
    next()
  }

}

module.exports={
  isLoggedIn,
  hasLoggedOut,
  isAdmin
}
