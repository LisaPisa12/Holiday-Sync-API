module.exports = (sequelize, DataTypes) => { 
  const Dates = sequelize.define('Dates', {
  Date: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  HolidayID: {
    type: DataTypes.INT,
    allowNull: false
  }

});

Dates.associate = function({Holiday}) {
  Dates.belongsToMany(Holiday, { 
    foreignKey: {
      name:'hid',
      allowNull:false
    }

  });
}

}