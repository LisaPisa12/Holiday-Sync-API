const { config } = require('dotenv');

const isTest = process.env.NODE_ENV === 'test';
if (isTest) config();
else {
  config({ path: '../.env' });
}

const DATABASE = {
  db_host: isTest ? 'localhost' : process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  db_port: process.env.DB_PORT,
  db_name: isTest ? process.env.DB_NAME_TEST : process.env.DB_NAME,
  db_user: isTest ? process.env.DB_USER_TEST : process.env.DB_USER,
  db_password: isTest ? process.env.DB_PASSWORD_TEST : process.env.DB_PASSWORD,
};

const SERVER = {
  server_port: process.env.SERVER_PORT,
};

module.exports = { DATABASE, SERVER };
