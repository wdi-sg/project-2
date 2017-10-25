const Admin = require('../models/admin')
const express = require('express')
const router = express.Router()
const adminCode = process.env.ADMIN_CODE

router.get('/register', (req, res) => {
  res.render('admins/register')
})
router.post('/register', (req, res) => {

  var adminData = req.body.admin

  if (adminData.code !== adminCode) {
    // if it's wrong flow, MUST call `return`
    console.log('test')
    // UPDATE AFTER 20 Oct, redirect back to `/admins/register`
    return res.redirect('/admin/register')
  }

  var newAdmin = new Admin({
    name: adminData.name,
    email: adminData.email,
    password: adminData.password
  })

  newAdmin.save()
  .then(
    admin => res.send(admin)
  )
  .catch(
    err => res.send(err)
  )
})

router.get('/login', (req, res) => {
  res.render('admins/login')
})

router.post('/login', (req, res) => {

  const adminData = req.body.admin

  if (adminData.code !== adminCode){
    return res.redirect('/admin/login')
  }
  Admin.findOne({
    email: adminData.email
  })
  .then(
    admin => {
      if (!admin) {
        console.log('admin is null')
        return res.redirect('/admin/login')
      }


      admin.validPassword(adminData.password, (err, valid) => {
        // comparison failed here, if `valid` is false
        if (!valid) {
          console.log('comparison failed')
          return res.redirect('/admin/login')
        }

        // if output is true, redirect to homepage
        console.log('comparison success')
        res.redirect('/')
      })
    },
    err => res.send('error is found')
  )
})

module.exports = router
