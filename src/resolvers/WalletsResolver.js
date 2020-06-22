const UsersDB = require('../db/UsersDB')
const ExpensesDB = require('../db/ExpensesDB')

/**
 * Queries
 */
async function getDatetime(_parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const user = await UsersDB.getUserByCognitoId(userId)
  console.log('user:::', JSON.stringify(user, null, 2))
  return new Date(args.datetime)
}

async function getExpenses(_parent, _args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const expenses = await ExpensesDB.getExpenses(userId)
  return expenses
}

async function getWallets(_parent, _args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const wallets = await ExpensesDB.getWallets(userId)
  return wallets
}

/**
 * Mutations
 */
async function registerExpense(_parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const expense = { ...args, owner: userId }
  const newExpense = await ExpensesDB.registerExpense(expense)
  console.log("newExpense:::", JSON.stringify(newExpense, null, 2))
  return newExpense
}

async function registerWallet(_parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const newWallet = await ExpensesDB.registerWallet({ ...args, owner: userId })
  console.log("newWallet:::", JSON.stringify(newWallet, null, 2))
  return newWallet
}

/**
 * Extra fields resolvers
 */
async function getExpenseWallet(parent) {
  console.log({ parent })
  const wallet = await ExpensesDB.getWalletById(parent.wallet)
  return wallet
}

module.exports = {
  QUERIES: {
    getDatetime,
    getExpenses,
    getWallets,
  },
  MUTATIONS: {
    registerExpense,
    registerWallet,
  },
  EXTRA_FIELDS: {
    Expense: {
      wallet: getExpenseWallet
    }
  }
}