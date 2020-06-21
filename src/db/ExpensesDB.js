// @ts-check
const mongoose = require('mongoose')
const { Expense, Wallet } = require('./models')

async function connect() {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
}

async function disconnect() {
  await mongoose.connection.close()
}

// MUTATIONS
async function registerExpense(expense) {
  await connect()
  const newExpense = await new Expense(expense).save()
  await disconnect()
  return newExpense;
}

async function registerWallet(wallet) {
  await connect()
  let newWallet
  if (wallet._id) {
    newWallet = await Wallet.findByIdAndUpdate(wallet._id, wallet, { new: true })
  } else {
    newWallet = await new Wallet(wallet).save()
  }
  await disconnect()
  return newWallet
}

// QUERIES
async function getExpenses(userId) {
  await connect()
  const expenses = await Expense.find({ owner: userId })
  await disconnect()
  return expenses
}

async function getWallets(userId) {
  await connect()
  const wallets = await Wallet.find({ owner: userId })
  await disconnect()
  return wallets
}

async function getWalletById(id) {
  await connect()
  const wallet = await Wallet.findById(id)
  await disconnect()
  return wallet
}



module.exports = {
  registerExpense,
  registerWallet,
  getExpenses,
  getWallets,
  getWalletById,
}