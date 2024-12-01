const mongoose = require('mongoose')
const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 3
  },
  number: {
    type: String,
    required: true,
    minlength: 9, // 8 digits and 1 '-'
    validate: {
      validator: (v) => {
        const parts = v.split('-')

        if (parts.length !== 2) return false // two sections separated by '-'
        if (isNaN(parts[0]) || isNaN(parts[1])) return false // both parts are numbers
        if (parts[0].length < 2 || parts[0].length > 3) return false // first part has 2 or 3 digits
        if (parts[0].length + parts[1].length < 8) return false // total length is 8 or more

        return true
      }
    }
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)