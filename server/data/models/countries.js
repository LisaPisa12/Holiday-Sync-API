const { DataTypes } = require('sequelize');


module.exports = (sequelize) => { 
  const countries = sequelize.define('countries', {
  CountryName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
    }
  });

}
