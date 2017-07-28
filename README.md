# teachSync <br>
https://cryptic-forest-97137.herokuapp.com/

## ABOUT

teachSync allows potential tutors to "advertise" themselves on the platform to students. Upon registering, a tutor would then have to wait for a request from potential students.

Students upon registering would be able to access the site and filter through potential teachers. Once they have found suitable teacher/s, they would then be able to send a request to them requesting for a session. The tutors would then get back to the students if interested.

## USER STORIES

#### Student
Upon registration, a student would have to put in particulars about themselves including the subject which they need assistance in.

After successful registration and logging in, a student would then be able to filter through the tutors who have been registered on the platform and then request a "session" with them. Upon requesting, the particulars of the student would then be sent over to the tutor. The student would then have to wait for the tutor to get back to them.

#### Teacher
Upon registration, a teacher would have to put in particulars about themselves including the subject which they can teach and also the expected fee they would demand.

Upon successfully registering and logging in, a teacher would be able to see the requests which have been sent by other students indicating that the students would like to be contacted. Using the particulars given by the student, including subject and email among other stuff, the teacher may then choose to either contact the student or reject the request sent to them.

## API
Google Maps API was used in this project to aid the tutor in locating the address of the student in the event the tutor decides to provide home tuition

### Using Two Passport Strategies
As the app allows both students and teachers to log on, passport would need to authenticate to models. This was done via utilizing two different passport strategies.

```
passport.use(
  'local-student',
  new LocalStrategy(
    {
      usernameField: 'student[email]',
      passwordField: 'student[password]',
      passReqToCallback: true
    },
    localVerifyStudent
  )
)

passport.use(
  'local-teacher',
  new LocalStrategy(
    {
      usernameField: 'teacher[email]',
      passwordField: 'teacher[password]',
      passReqToCallback: true
    },
    localVerifyTeacher
  )
)
```

## Connecting the models
Both models share the same relationship with one another. One student may have a minimum of zero students or maximum of infinite students. The same applies for students who may not get a tutor but may also have infinite teachers.


## CRUD

#### CREATE
Every time a student or a teacher registers online, a post request would be sent out along with the form data which initiates the function create. The create then takes the form data and saves it into the database.

```
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
  email: req.body.student.email,
  password: req.body.student.password,
})

newStudent.save(function (err, newStudent) {
  if (err) {
    req.flash('error', 'Could not create user account');
    return res.redirect('/students/new');
  }

  res.redirect('/')
})
});
}
```

#### Update
Similar to "Create", update was done using the create function
```
function updateName (req,res) {

  Teacher.findOne({_id: req.user.id}, function (err,teacher) {
    if(err) res.send(err)
    teacher.name = req.body.name
    teacher.save()
      })
res.redirect('/teachers/updateProfile')
}
```

#### Delete
In order to remove a student's ID from a referenced teacher's document, the logged in user's id was used to find his document. Upon retrieving the document, the clicked button which initated the function would then pass the student's ID into the function which would then be used to find and delete the id from the teacher's array

###### Handlebars file
```
{{#each students as |student|}}
<ul>
<form method="post" action="/teachers/deleteStudent">
<li>Name: {{student.name}}<br>
Address: {{student.address}}<br>
Postal Code: {{student.postalCode}}<br>
Email: {{student.email}}<br>
Secondary: {{student.level}}<br>
Subject Requested: {{student.subject}}<br>
Gender: {{student.gender}}<br>

<button name="id" value={{student.id}}>Delete</button>
</form>```


###### function Delete

```
function remove (req,res) {

Teacher.findOne({_id: req.user.id}, function (err,teacher) {
  if(err) res.send(err)
  var index = teacher.students.indexOf(req.body.id)
teacher.students.splice(index, 1)
teacher.save()
res.redirect('/teachers/teacherLoginView')
})
}

```
