const { ApolloServer } = require('apollo-server');

const db = require('../data/models');

const typeDefs = require('./schemas');
const resolvers = require('./resolvers');

module.exports = new ApolloServer({
  typeDefs,
  resolvers
});
