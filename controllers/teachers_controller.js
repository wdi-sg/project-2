const Teacher = require('../models/teacher.js');
const Student = require('../models/student.js');


function create (req,res) {

  var newTeacher = new Teacher ({
    name: req.body.teacher.name,
    gender: req.body.teacher.gender,
    address: req.body.teacher.address,
    postalCode: req.body.teacher.postalCode,
    subject: req.body.teacher.subject,
    education: req.body.teacher.education,
    description: req.body.teacher.description,
    fee: req.body.teacher.fee,
    email: req.body.teacher.email,
    password: req.body.teacher.password,
  })

  newTeacher.save(function (err, newTeacher) {
    if (err) res.send(err)

    res.redirect('/')
  })
}

function login (req, res) {
  // find the user by email

  Teacher
  .findOne({
    email: req.body.teacher.email
  })
  .exec(function (err, foundUser) {
    if (err) return res.send(err)

    const formPassword = req.body.teacher.password

    if (foundUser.validPassword(formPassword)) {
      res.send('valid, redirect to profile')
    } else {
      res.send('invalid, show flash message')
    }
  })

  // User.valid(req.body.user.password) // returns true or false
}

function showAllRequests (req,res) {
  Teacher
.findOne({
  _id: req.user.id
})
.populate('students')
.exec(function (err, teacher) {
  if (err) res.send(err)
  res.render('teacherLoginView/index', {
    students: teacher.students,
    user: req.user
  })
})
}

function remove (req,res) {

Teacher.findOne({_id: req.user.id}, function (err,teacher) {
  if(err) res.send(err)
  var index = teacher.students.indexOf(req.body.id)
teacher.students.splice(index, 1)
teacher.save()
res.redirect('/teachers/teacherLoginView')
})
}

function updateName (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.name = req.body.name
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function updateGender (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.gender = req.body.gender
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function updateAddress (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.address = req.body.address
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}


function updatePostalCode (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.postalCode = req.body.postalCode
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function updateSubject (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.subject = req.body.subject
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function updateQualification (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.qualification = req.body.qualification
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function updateDescription (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.description = req.body.description
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function updateFee (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.fee = req.body.fee
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}

function test (req, res, next) {
  var studentsId = req.user.students
  var studentArr = []
  studentsId.forEach(function(studentId) {
    Student.findById(studentId, function(err, student){
      if (err) res.send(err)
      studentArr.push(student)
      if(studentArr.length === studentsId.length) {
       res.render('test/index', {
         student: studentArr
       })
     }
    })
  })
}

module.exports = {
  create,
  login,
  showAllRequests,
  remove,
  updateName,
  updateGender,
  updateAddress,
  updatePostalCode,
  updateSubject,
  updateQualification,
  updateDescription,
  updateFee,
  test
}
