// @ts-check
const { ApolloServer } = require('apollo-server-lambda')
const typeDefs = require('./graphql/schema')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: false, // { endpoint: "/dev/graphql" },
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  }),
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: '*',
    credentials: false,
  },
})