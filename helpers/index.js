const isLoggedIn = (req,res, next)=>{
  if(req.user){
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

const isAdminLoggedIn = (req, res, next)=>{
  // console.log(req.user.type);
  if(req.user === undefined){
    next()
  }else if(req.user.type === "user"){
      req.flash("error","Please log out of user account before attempting to access admin console")
      res.redirect("/")

    }
  else if(req.user.type === "admin"){
    req.flash("error","Access Denied: Admin already logged in")
    res.redirect("/")
  }

}

module.exports={
  isLoggedIn,
  hasLoggedOut,
  isAdmin,
  isAdminLoggedIn
}
