'use strict';

const query = require('./query.resolvers');
const mutation = require('./mutation.resolvers');
const types = require('./types.resolvers');

const resolvers = {
  Query: query,
  ...types
};

module.exports = resolvers;