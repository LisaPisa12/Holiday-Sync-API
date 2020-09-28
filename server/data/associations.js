function applyAssociations(sequelize) {
  
  const {dates, countries, holidays} = sequelize.models;
  

  
  
  holidays.belongsTo(countries, {through: countries});
  countries.hasMany(holidays);
  holidays.hasMany(dates);
  dates.belongsTo(holidays, {through: holidays});
  
  
}

module.exports = { applyAssociations };