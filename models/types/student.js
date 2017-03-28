const mongoose = require('mongoose')
const Classroom = require('../models/classroom').schema
const Parent = require('../models/parent').schema
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

const studentSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String,
  required: true,
  unique: true,
  lowercase: true,
  match: emailRegex
  },
  classroom: {type: mongoose.Schema.Types.ObjectId, ref: 'Classroom'},
  parent: {Parent}

})
