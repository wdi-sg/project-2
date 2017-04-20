const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

let UserSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [
      3,
      'your user name must be between 3 and 99 characters'
    ],
    maxlength: [
      99,
      'your user name must be between 3 and 99 characters'
    ]
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [
      true,
      'please provide your gender'
    ]
  },
  age: {
    type: Number,
    min: [
      15,
      'your age must be between ages 15 and 109 to volunteer'
    ],
    max: [
      109,
      'your age must be between ages 15 and 109 to volunteer'
    ],
    required: [
      true,
      'please provide your age'
    ]
  },
  email: {
    type: String,
    required: [
      true,
      'an email address is required'
    ],
    unique: [
      true,
      'that email address belongs to an existing user'
    ],
    lowercase: [
      true,
      'please key in your email address in lowercase'
    ],
    match: [
      emailRegex,
      'that email address is not a valid regular expression'
    ]
  },
  password: {
    type: String,
    required: [
      true,
      'a password is required'
    ],
    minlength: [
      8,
      'your password must be between 8 and 99 characters'
    ],
    maxlength: [
      99,
      'your password must be between 8 and 99 characters'
    ]
  },
  userTypes: {type: {
    admin: {
      type: Boolean
    },
    guardian: {
      type: Boolean
    },
    volunteer: {
      type: Boolean
    }
  }},
  createdPrograms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    }
  ],
  signedTheseBeneficiariesUp: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beneficiary'
    }
  ],
  signedBeneficiariesUpToThesePrograms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
      // unique: [
      //   true,
      //   'this beneficiary is already signed up to this program'
      // ]
    }
  ],
  joinedPrograms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
    }
  ]
})

UserSchema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()
  let hash = bcrypt.hashSync(user.password, 10)
  user.password = hash
  next()
})

UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.options.toJSON = {
  transform: function (doc, ret, options) {
    delete ret.password
    return ret
  }
}

let User = mongoose.model('User', UserSchema)

UserSchema.path('userTypes').validate(function (userTypes) {
  for (var role in userTypes) {
    if (userTypes[role] === true) {
      return true
    }
  }
  return false
}, 'at least one mode of intended participation is required')

module.exports = User
