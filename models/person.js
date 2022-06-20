const mongoose = require('mongoose')

const person = mongoose.model('person', {
    name: String, 
    salary: Number, 
    charge: String
})

module.exports = person
