const mongoose = require('mongoose')
const Student = require("../models/student").schema
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

const parentSchema = new mongoose.Schema({
  name: { type: String},
  email: { type: String,
  required: true,
  unique: true,
  lowercase: true,
  match: emailRegex
  },
  child: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'}
})
