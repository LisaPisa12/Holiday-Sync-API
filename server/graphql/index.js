const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
  typeDefs,
  resolvers
});
