const mongoose = require('mongoose')

if (process.env.IS_OFFLINE) {
  delete mongoose.connection.models["Expense"]
}

const ExpenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  wallet: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  comments: String,
  imageUris: {
    type: [String],
    required: true
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
})

module.exports = mongoose.model("Expense", ExpenseSchema)
