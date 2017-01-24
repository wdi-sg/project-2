const mongoose = require('mongoose')

let categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true
  },
  number: {
    type: Number,
    require: true,
    default: 0
  },
  img: {
    type: String
  }
})

let Category = mongoose.model('Category', categorySchema)

let cat = ['Yoga', 'Badminton', 'Basketball', 'Gym Workout', 'Street Workout', 'Cross Fit', 'archery', 'Baseball', 'Beach Volleyball',
  'Boxing', 'Canoe', 'Climbing', 'Cycling', 'Diving', 'Equestrian', 'Fencing', 'Field hockey', 'Golf', 'Gymnastics', 'Handball', 'Judo', 'Karate', 'Roller Sport', 'Rowing', 'Rugby', 'Sailing', 'Shooting', 'Soccer', 'Swimming', 'Surfing', 'Synchronized Swimming', 'Table Tennis', 'Taekwondo', 'Tennis', 'Track & Field', 'Triathlon', 'Volleyball (indoor)', 'Water polo', 'Weightlifting', 'Wrestling']

for (let i = 0; i < cat.length; i++) {
  Category.create({
    name: cat[i]
  })
}


module.exports = Category
