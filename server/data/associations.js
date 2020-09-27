function applyAssociations(sequelize) {
  
  const {dates, countries, holidays} = sequelize.models;
  
  
  dates.belongsTo(holidays, {through: holidays});

  holidays.belongsTo(countries);


  holidays.hasMany(dates);

  countries.hasMany(holidays);
  
}

module.exports = { applyAssociations };