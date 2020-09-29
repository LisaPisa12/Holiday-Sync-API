const moment = require('moment');
const db = require('../../data/models');
const { Op } = db.Sequelize;

module.exports = {
  today: async () => {
    try {
      const currentDate = moment().format('MMMMDoYYYY');
      const dates = await db.sequelize.models.dates.findAll(
        {where: { Date:currentDate},
        include:[
          {model: db.sequelize.models.holidays, include: [db.sequelize.models.countries]}
        ]})
      let holidays = dates.map(el => el.holiday)
      return holidays;
    } catch (err) {
      console.log(err)
    }
  },
  date: async (_, {date}) => {
    try {
      const formatedDate = moment(date).format('MMMMDoYYYY');
      const dates = await db.sequelize.models.dates.findAll(
        {where: { Date:formatedDate},
        include:[
          {model: db.sequelize.models.holidays, include: [db.sequelize.models.countries]}
        ]})
      let holidays = dates.map(el => el.holiday)
      return holidays;
    } catch (err) {
      console.log(err)
    }
  },
  holiday: async (_, {name}) => {
    try {
      // to capitalize()
      const holidays = await db.sequelize.models.holidays.findAll(
        {where: { HolidayName: {[Op.like]: `% ${name} %`}},
        include:[
          {model: db.sequelize.models.countries}
        ]})
      return holidays;
    } catch (err) {
      console.log(err)
    }
  },
  country: async (_, {name}) => {
    try {
      const country = await db.sequelize.models.countries.findOne(
        {where: { CountryName: {[Op.like]: `%${name}%`}},
        include:[
          {model: db.sequelize.models.holidays, include: [db.sequelize.models.countries, db.sequelize.models.dates]}
        ]})
      // console.log(country.holidays[0].dates)
      return country.holidays;
    } catch (err) {
      console.log(err)
    }
  },

}