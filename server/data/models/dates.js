const { DataTypes } = require('sequelize');


module.exports = (sequelize) => { 
  const dates = sequelize.define('dates', {
    Date: {
      type: DataTypes.STRING,
      allowNull: false,
    }
});



}