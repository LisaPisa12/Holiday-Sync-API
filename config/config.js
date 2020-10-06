const { config } = require('dotenv');

config({ path: '../.env' });

const isTest = process.env.NODE_ENV === 'test';
console.log(process.env.DB_HOST);
const DATABASE = {
  db_host: isTest ? 'localhost' : process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  db_port: process.env.DB_PORT,
  db_name: isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
};

const SERVER = {
  server_port: process.env.SERVER_PORT,
};

module.exports = { DATABASE, SERVER };
