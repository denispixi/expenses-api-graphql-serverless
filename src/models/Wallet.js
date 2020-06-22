// @ts-check
const mongoose = require('mongoose')

if (process.env.IS_OFFLINE) {
  delete mongoose.connection.models["Wallet"]
}

module.exports = mongoose.model('Wallet', new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  walletType: {
    type: String,
    required: true,
  },
  funds: {
    type: Number,
    required: true,
  },
  color: {
    type: String
  },
  owner: {
    type: String,
    required: true,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
}, {
  versionKey: false
}))