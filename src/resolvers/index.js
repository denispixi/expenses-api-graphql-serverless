const scalars = require('./scalars')
const ExpensesResolvers = require('./ExpensesResolver')

module.exports = {
  Query: {
    ...ExpensesResolvers.QUERIES,
  },
  Mutation: {
    ...ExpensesResolvers.MUTATIONS,
  },
  ...ExpensesResolvers.EXTRA_FIELDS,
  ...scalars,
}