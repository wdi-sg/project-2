const Student = require('../models/student.js');
const Teacher = require('../models/teacher.js');
const geocoder = require('geocoder')


function create (req,res) {


Student.findOne({email: req.body.student.email}, function (err, student) {
  if (err) return res.send(err)
  if (student) {
    req.flash('msg', 'The email has already been used to register!')
    res.redirect('/students/new')
  } else {
    var lat =''
    var lng =''

      geocoder.geocode(`${req.body.student.postalCode}, singapore`, function(err, data) {
        lat = data.results[0].geometry.location.lat;
        lng = data.results[0].geometry.location.lng;

      var newStudent = new Student ({
        name: req.body.student.name,
        gender: req.body.student.gender,
        address: req.body.student.address,
        postalCode: req.body.student.postalCode,
        latitude: lat,
        longitude: lng,
        subject: req.body.student.subject,
        level: req.body.student.level,
        stream: req.body.student.stream,
        category: "student",
        email: req.body.student.email,
        password: req.body.student.password,
      })

      newStudent.save(function (err, newStudent) {
        if (err) {
          if (err.errors.name) req.flash('msg', err.errors.name.message)
          if (err.errors.gender) req.flash('msg', err.errors.gender.message)
          if (err.errors.address) req.flash('msg', err.errors.address.message)
          if (err.errors.postalCode) req.flash('msg', err.errors.postalCode.message)
          if (err.errors.subject) req.flash('msg', err.errors.subject.message)
          if (err.errors.stream) req.flash('msg', err.errors.stream.message)
          if (err.errors.email) req.flash('msg', err.errors.email.message)
          if (err.errors.password) req.flash('msg', err.errors.password.message)
          return res.redirect('/students/new');
        }
        req.flash('msg', 'New student account successfully created! Login as a student to conitnue')
        res.redirect('/')
      })
    });
  }
})

}

function login (req, res) {
  // find the user by email

  Student
  .findOne({
    email: req.body.student.email
  })
  .exec(function (err, foundUser) {
    if (err) return res.send(err)

    const formPassword = req.body.student.password

    if (foundUser.validPassword(formPassword)) {
      res.send('valid, redirect to profile')
    } else {
      res.send('invalid, show flash message')
    }
  })

  // User.valid(req.body.user.password) // returns true or false
}

function refer (req,res) {
  // var email = req.user.email
  // res.send(email)
  Student.findOne({email: req.user.email}, function (err, student) {
    if (err) res.send(err)
  //   res.send(student)
    Teacher.findOne({email: req.body.email}, function (err, teacher) {
      teacher.students.push(student._id)
      teacher.save()
      student.teachers.push(teacher._id)
      student.save()
      // res.send(teacher)
      res.redirect('/students/studentRequestView')
    } )
  })

  // res.send(req.body)
}

function showAllTeachers (req, res) {
  Teacher.find({}, function (err, teachers) {
    // console.log(req.user)
    res.render('studentLoginView/index', {
      teachers: teachers,
    });
  })
}

function showRequests (req,res) {
  Student
.findOne({
  _id: req.user.id
})
.populate('teachers')
.exec(function (err, student) {
  if (err) res.send(err)
  res.render('studentRequestView/index', {
    teachers: student.teachers
  })
})
}

function searchTeacher (req,res) {
  // console.log(req.body.searchField)
  Teacher
.find({
  subject: req.body.searchField
})
.exec(function (err, teachers) {
  if (err) res.send(err)
  res.render('studentSearchView/index', {
    teachers: teachers
  })
})
}

function deleteRequest (req,res) {
  Student.findOne({_id: req.user.id}, function (err,student) {
    if(err) res.send(err)
    var index = student.teachers.indexOf(req.body.id)
  student.teachers.splice(index, 1)
  student.save()
  res.redirect('/students/studentRequestView')
  })
}

module.exports = {
  create,
  login,
  refer,
  showRequests,
  showAllTeachers,
  searchTeacher,
  deleteRequest
}
