'use strict';

const { gql } = require('apollo-server');

const query = require('./query.schema');
const mutation = require('./mutation.schema');
const types = require('./types.schema');

module.exports = gql`
  ${query}
  ${mutation}
  ${types}
`;