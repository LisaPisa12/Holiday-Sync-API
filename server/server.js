const express = require('express');
const app = express();
const db = require('./data/models');

// const emitter = new EventEmitter()
// emitter.setMaxListeners(0)

(async () =>{
  try {
    await db.sequelize.sync();
    const port = 3000;
    app.listen(port);
    console.log(`Server listening on port ${port}`); // eslint-disable-line no-console
  } catch (e) {
    console.error('Error connecting to the db', e); // eslint-disable-line no-console
  }
})();