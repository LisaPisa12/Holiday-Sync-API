const moment = require('moment');
const db = require('../../data/models');
const { Op } = db.Sequelize;

module.exports = {
  today: async () => {
    try {
      const currentDate = moment().format('MMMM Do YYYY');
      const dates = await db.sequelize.models.dates.findAll({
        where: { Date: currentDate },
        include: [{ model: db.sequelize.models.holidays, include: [db.sequelize.models.countries, db.sequelize.models.dates] }],
      });
      let holidays = dates.map((el) => el.holiday);
      return holidays;
    } catch (err) {
      console.log(err);
    }
  },
  date: async (_, { date }) => {
    try {
      const formatedDate = moment(date).format('MMMM Do YYYY');
      const dates = await db.sequelize.models.dates.findAll({
        where: { Date: formatedDate },
        include: [{ model: db.sequelize.models.holidays, include: [db.sequelize.models.countries] }],
      });
      let holidays = dates.map((el) => el.holiday);
      return holidays;
    } catch (err) {
      console.log(err);
    }
  },
  holiday: async (_, { name }) => {
    try {
      const holidays = await db.sequelize.models.holidays.findAll({
        where: { HolidayName: { [Op.like]: `%${name}%` } },
        include: [{ model: db.sequelize.models.countries }, { model: db.sequelize.models.dates }],
      });
      return holidays;
    } catch (err) {
      console.log(err);
    }
  },
  country: async (_, { name }) => {
    try {
      const cleanName = name.toLowerCase();
      const capCountryName = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      const country = await db.sequelize.models.countries.findOne({
        where: { CountryName: { [Op.like]: `%${capCountryName}%` } },
        include: [{ model: db.sequelize.models.holidays, include: [db.sequelize.models.countries, db.sequelize.models.dates] }],
      });
      return country.holidays;
    } catch (err) {
      console.log(err);
    }
  },

  rangeDates: async (_, { datesrange }) => {
    try {
      const fromDate = moment(datesrange.split('-')[0]).format('MMMM Do YYYY');
      const toDate = moment(datesrange.split('-')[1]).format('MMMM Do YYYY');

      const dates = await db.sequelize.models.dates.findAll({
        where: {
          Date: { [Op.between]: [fromDate, toDate] },
        },
        include: [{ model: db.sequelize.models.holidays, include: [db.sequelize.models.countries, db.sequelize.models.dates] }],
      });
      let holidays = dates.map((el) => el.holiday);
      return holidays;
    } catch (err) {
      console.log(err);
    }
  },
};
