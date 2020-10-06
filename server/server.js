const graphql = require('./graphql');
const { SERVER } = require('../config/config');
const db = require('./data/models');

(async () => {
  try {
    await db.sequelize.sync();
    const server = await graphql.listen(SERVER.server_port);
    console.log(`Server listening on ${server.url}`); // eslint-disable-line no-console
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();
