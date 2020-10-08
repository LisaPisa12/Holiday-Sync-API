const db = require('../server/data/models');
const { createTestClient } = require('apollo-server-testing');
const moment = require('moment');
const { constructTestServer, queries } = require('./__utils');
const { GET_TODAY, GET_DATE, GET_HOLIDAY, GET_COUNTRY, GET_RANGE } = queries;

const countries = db.sequelize.models.countries;
const holidays = db.sequelize.models.holidays;
const dates = db.sequelize.models.dates;

const mockData = {
  country: ['Tattoine', 'Mordor'],
  holiday: [
    { HolidayName: 'independence day', countryId: 2 },
    { HolidayName: 'second independence day', countryId: 2 },
    { HolidayName: 'Lord of the rings day', countryId: 1 },
  ],
  days: [
    { Date: moment().format('MMMM Do YYYY'), holidayId: 2 },
    { Date: moment('2020/11/17').format('MMMM Do YYYY'), holidayId: 1 },
    { Date: moment('2020/11/18').format('MMMM Do YYYY'), holidayId: 3 },
  ],
};

describe('Queries', () => {
  const server = constructTestServer();
  const { query } = createTestClient(server);
  let res;
  beforeAll(async () => {
    await db.sequelize.sync({ force: true });
    try {
      await Promise.all(
        mockData.country.map(async (country) => {
          await countries.findOrCreate({ where: { CountryName: country } });
        })
      );

      await holidays.bulkCreate(mockData.holiday);
      await dates.bulkCreate(mockData.days);
    } catch (error) {
      console.log(error);
    }
  }, 5000);

  afterAll(async () => {
    await db.sequelize.drop();
    await db.sequelize.close();
  });

  it('Get todays holidays', async () => {
    res = await query({ query: GET_TODAY });

    expect(res.data.today.length).toBeGreaterThan(0);
    expect(res.data.today[0]).toHaveProperty('HolidayName', 'second independence day');
    expect(res.data.today[0]).toHaveProperty('CountryName', 'Mordor');
    expect(res.data.today[0]).toHaveProperty('Date', moment().format('MMMM Do YYYY'));
  });
  it('Get Date Holidays', async () => {
    res = await query({ query: GET_DATE });
    expect(res.data.date.length).toBe(1);
    expect(res.data.date[0]).toHaveProperty('HolidayName', 'Lord of the rings day');
    expect(res.data.date[0]).toHaveProperty('CountryName', 'Tattoine');
  });

  it('Get holidays by name', async () => {
    res = await query({ query: GET_HOLIDAY });
    expect(res.data.holiday.length).toBe(2);
    expect(res.data.holiday[1]).toHaveProperty('HolidayName', 'independence day');
    expect(res.data.holiday[0]).toHaveProperty('CountryName', 'Mordor');
    expect(res.data.holiday[1]).toHaveProperty('Date', 'November 17th 2020');
  });

  it('Get all holidays for a country', async () => {
    res = await query({ query: GET_COUNTRY });
    expect(res.data.country.length).toBe(2);
    expect(res.data.country[0]).toHaveProperty('HolidayName');
    expect(res.data.country[0]).toHaveProperty('CountryName');
    expect(res.data.country[0]).toHaveProperty('Date');
  });
  it('Get all holidays in the indicated range', async () => {
    res = await query({ query: GET_RANGE });
    expect(res.data.rangeDates.length).toBe(2);
    expect(res.data.rangeDates[1]).toHaveProperty('HolidayName', 'Lord of the rings day');
    expect(res.data.rangeDates[0]).toHaveProperty('CountryName', 'Mordor');
    expect(res.data.rangeDates[1]).toHaveProperty('Date', 'November 18th 2020');
  });
});
