const mongoose = require('mongoose')

let BeneficiarySchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [
      3,
      'your beneficiary\'s name must be between 3 and 99 characters'
    ],
    maxlength: [
      99,
      'your beneficiary\'s name must be between 3 and 99 characters'
    ]
  },
  gender: {
    type: String,
    enum: ['male', 'female'],
    required: [
      true,
      'please provide your beneficiary\'s gender'
    ]
  },
  age: {
    type: Number,
    min: [
      5,
      'your beneficiary\'s age must be between ages 5 and 109 to qualify for this program'
    ],
    max: [
      109,
      'your beneficiary\'s age must be between ages 5 and 109 to qualify for this program'
    ],
    required: [
      true,
      'please provide your beneficiary\'s age'
    ]
  },
  guardian: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  programs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program'
      // unique: [
      //   true,
      //   'this beneficiary is already signed up to this program'
      // ]
    }
  ]
})

let Beneficiary = mongoose.model('Beneficiary', BeneficiarySchema)

module.exports = Beneficiary
