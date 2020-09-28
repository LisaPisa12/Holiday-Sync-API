const { DataTypes } = require('sequelize');
const countries = require('./countries');

module.exports = (sequelize) => {

  const holidays = sequelize.define('holidays', {
    HolidayName: {
      type: DataTypes.STRING,
      allowNull: false, 
    }
  });

} 
