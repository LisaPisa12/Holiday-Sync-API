const moment = require('moment');

module.exports = {
  Holidays: {
    CountryName: (obj) => {
      return obj.country.CountryName;
    },
    Date: (obj) => {
      return obj.dates[0].Date;
    }
  }
}