// @ts-check
const mongoose = require('mongoose')
const User = require('../models/User')

async function getUserByCognitoId(_id) {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    const user = await User.findOne({ _id })
    await mongoose.connection.close()
    return user
  } catch (error) {
    console.log('error getting user from DB:::', error)
  }
}

module.exports = {
  getUserByCognitoId
}