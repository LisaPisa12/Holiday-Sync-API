'use strict';

const query = require('./query.schema');
const mutation = require('./mutation.schema');
const types = require('./type.schema');

module.exports = `
  ${query}
  ${mutation}
  ${types}
`;