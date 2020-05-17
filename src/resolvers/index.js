// @ts-check
const scalars = require('./scalars')
// const userResolvers = require('./users')
const expensesResolvers = require('./expenses')


module.exports = {
  Query: {
    ...expensesResolvers.QUERIES,
  },
  Mutation: {
    ...expensesResolvers.MUTATIONS,
  },
  ...expensesResolvers.EXTRA_FIELDS,
  ...scalars,
}