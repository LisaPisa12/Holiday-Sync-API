const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const modelDefiners = [ require('./countries'),
                        require('./dates'),
                        require('./holidays')];
const {applyAssociations} = require('../associations');

const db = {};

const sequelize = new Sequelize('worldwideholidays', 'elisar', '', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
});



for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

applyAssociations(sequelize);


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
