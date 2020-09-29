module.exports = `
  type Query {
    today: [Holidays],
    date(date:String): [Holidays],
    holiday(name:String): [Holidays],
    country(name:String): [Holidays],
    rangeDates(datesrange:String):[Holidays]
  }
  `;