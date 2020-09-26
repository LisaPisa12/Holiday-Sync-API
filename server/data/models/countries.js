const { DataTypes } = require('sequelize');


module.exports = (sequelize) => { 
  
  sequelize.define('countries', {
  CountryName: {
    type: DataTypes.STRING,
    allowNull: false
  }
});


// //change this
// Countries.associate = function ({Holidays}) {
//   Countries.belongsToMany(Holidays);
//  }
 }