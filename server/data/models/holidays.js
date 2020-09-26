const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('holidays', {
    HolidayName: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    CountryID: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  //change this
  // Holidays.associate = function ({Holidays, Countries, Dates}) {
  //   Holidays.belongsToMany(Countries, {
  //     foreignKey: {
  //       name:'cid',
  //       allowNull:false
  //     }
  //   });
  //   Holidays.belongsToMany(Dates);
  // }
} 