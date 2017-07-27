const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')


var teacherSchema = new Schema ({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  gender: {
    type: String,
    required: [true, 'Gender is required']
  },
  address: {
    type: String,
    required: [true, 'Address is required']
  },
  postalCode: {
    type: Number,
    required: [true, 'Postal Code is required']
  },
  subject: {
    type: String,
    required: [true, 'Preferred subject to teach is required']
  },
  education: {
    type: String,
    required: [true, 'Educational level is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required']
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  fee: {
    type: Number,
    required: [true, 'Expected fee is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

teacherSchema.pre('save', function (next) {
  var user = this // this keyword ==> the newUser obj instance

   // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

   // hash the password ASYNCHRONOUSLY
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) return next(err)

    // Override the cleartext password with the hashed one
    user.password = hash
    next() // call the save fn
  })
})

teacherSchema.methods.validPassword = function (givenPassword) {
  // t/f based on the user.hashed compared with form.password

  return bcrypt.compareSync(givenPassword, this.password)
}


const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher
