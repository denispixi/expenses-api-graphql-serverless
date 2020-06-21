// @ts-check
const { UsersDB, ExpensesDB } = require('../db')

/**
 * Queries
 */
async function getDatetime(parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const user = await UsersDB.getUserByCognitoId(userId)
  console.log('user:::', JSON.stringify(user, null, 2))
  return new Date(args.datetime)
}

async function getExpenses(parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const expenses = await ExpensesDB.getExpenses(userId)
  return expenses
}

async function getWallets(parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const wallets = await ExpensesDB.getWallets(userId)
  return wallets
}

/**
 * Mutations
 */
async function registerExpense(parent, args, context) {
  const userId = context.event.headers["expense-tracker-user-id"]
  const expense = { ...args, owner: userId }
  const newExpense = await ExpensesDB.registerExpense(expense)
  console.log("newExpense:::", JSON.stringify(newExpense, null, 2))
  return newExpense
}

async function registerWallet(parent, args, context) {
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