// @ts-check
const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')
const { ValidationError } = require('apollo-server-lambda')

module.exports = {
  Datetime: new GraphQLScalarType({
    name: 'Datetime',
    description: 'Datetime custom scalar type',
    serialize(value) {
      console.log('serializing...', value)
      return value.toISOString(); // value sent to the client
    },
    parseValue(value) {
      console.log('parsing value 1...')
      return new Date(value); // value from the client
    },
    parseLiteral(ast) {
      try {
        // @ts-ignore
        console.log('parsing value 22...', ast.value)
        if (ast.kind === Kind.STRING && !Number.isNaN(Date.parse(ast.value)))
          return new Date(ast.value); // ast value is always in string format
        throw new ValidationError('Invalid Date String')
      } catch {
        throw new ValidationError('Invalid Date String')
      }
    },
  }),
}