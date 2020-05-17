// @ts-check
const { gql } = require('apollo-server-lambda')

module.exports = gql`

scalar Datetime

type Query {
  getDatetime(datetime: Datetime!): Datetime
  getExpenses: [Expense!]!
  getWallets: [Wallet!]!
}

type Mutation {
  registerExpense(amount: Float!, wallet: ID!, imageUris: [String!]): Expense!
  registerWallet(name: String!, walletType: String!, funds: Float!, color: String): Wallet!
}

type User {
  _id: ID!
  email: String!
  name: String!
  expenses: [Expense!]
  wallets: [Wallet!]
}

type Expense {
  _id: ID!
  amount: Float!
  wallet: Wallet!
  imageUris: [String!]!
  createdAt: Datetime!
}

type Wallet {
  _id: ID!
  name: String!
  walletType: String!
  funds: Float!
  color: String
}

`