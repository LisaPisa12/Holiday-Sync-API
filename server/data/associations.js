function applyAssociations(sequelize) {
  
  const {dates, countries, holidays} = sequelize.models;
  
  
  dates.belongsTo(holidays, {through: holidays},{
    foreignKey: {
      name:'cid',
      allowNull:false
    }
  });

  holidays.belongsTo(countries, {
    foreignKey: {
      name:'cid',
      allowNull:false
    }
  });


  holidays.hasMany(dates);

  countries.hasMany(holidays);
  
}

module.exports = { applyAssociations };