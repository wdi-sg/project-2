const mongoose = require('mongoose')

let ProgramSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [
      3,
      'your program name must be between 3 and 99 characters'
    ],
    maxlength: [
      99,
      'your program name must be between 3 and 99 characters'
    ]
  },
  subject: {
    type: String,
    enum: ['disability', 'education', 'elderly', 'environment', 'health', 'poverty'],
    required: [
      true,
      'please select a volunteer area'
    ]
  },
  description: {
    type: String,
    required: [
      true,
      'please provide a short description of your program'
    ]
  },
  website: {
    type: String
  },
  imageURL: {
    type: String
  },
  commitment: {type: {
    daily: {
      type: Boolean
    },
    weekly: {
      type: Boolean
    },
    fortnightly: {
      type: Boolean
    },
    monthly: {
      type: Boolean
    },
    quarterly: {
      type: Boolean
    }
  }},
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  guardians: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  beneficiaries: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Beneficiary',
      // unique validator does not prevent repeats!
      unique: [
        true,
        'this beneficiary is already signed up to this program'
      ]
    }
  ],
  volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
})

let Program = mongoose.model('Program', ProgramSchema)

ProgramSchema.path('commitment').validate(function (commitment) {
  for (var frequency in commitment) {
    if (commitment[frequency] === true) {
      return true
    }
  }
  return false
}, 'please indicate at least one commitment frequency expected of your volunteers')

module.exports = Program
