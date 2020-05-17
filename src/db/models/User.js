// @ts-check
const mongoose = require('mongoose')

if (process.env.IS_OFFLINE) {
  delete mongoose.connection.models["User"]
}

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  email: String,
  name: String
}, {
  versionKey: false
})

module.exports = mongoose.model('User', userSchema)