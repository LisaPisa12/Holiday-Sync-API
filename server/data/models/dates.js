const { DataTypes } = require('sequelize');


module.exports = (sequelize) => { 
  sequelize.define('dates', {
  
    Date: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  HolidayId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

});
//change this
// Dates.associate = function({Holiday}) {
//   Dates.belongsToMany(Holiday, { 
//     foreignKey: {
//       name:'hid',
//       allowNull:false
//     }

//   });
// }

}