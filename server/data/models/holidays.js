module.exports = (sequelize, DataTypes) => {

  const Holidays = sequelize.define('Holidays', {
    HolidayName: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    CountryID: {
      type: DataTypes.INT,
      allowNull: false
    }
  });

  Holidays.associate = function ({Holidays, Countries, Dates}) {
    Holidays.belongsToMany(Countries, {
      foreignKey: {
        name:'cid',
        allowNull:false
      }
    });
    Holidays.belongsToMany(Dates);
  }
} 