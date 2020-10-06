const { createTestClient } = require('apollo-server-testing');
const { constructTestServer, queries } = require('./__utils');
const { GET_TODAY, GET_DATE, GET_HOLIDAY, GET_COUNTRY, GET_RANGE } = queries;
const db = require('../server/data/models')

beforeAll(() => {
  await db.sequelize.sync({ force: true, logging: false })
}, 5000);

describe('Queries', () => {
  const server = constructTestServer();
  const { query } = createTestClient(server);
  let res;

  it('Get todays holidays', async () => {
    res = await query({ query: GET_TODAY });
    console.log(res.data.today[0]);
    expect(res.data.today.length).toBeGreaterThan(0);
    expect(res.data.today[0]).toHaveProperty('HolidayName');
    expect(res.data.today[0]).toHaveProperty('CountryName');
    expect(res.data.today[0]).toHaveProperty('Date');
  });
  it('Get Date Holidays', async () => {
    res = await query({ query: GET_DATE });
    expect(res.data.date.length).toBe(22);
    expect(res.data.date[0]).toHaveProperty('HolidayName');
    expect(res.data.date[0]).toHaveProperty('CountryName');
  });

  it('Get holidays by name', async () => {
    res = await query({ query: GET_HOLIDAY });
    expect(res.data.holiday.length).toBe(2);
    expect(res.data.holiday[0]).toHaveProperty('HolidayName');
    expect(res.data.holiday[0]).toHaveProperty('CountryName');
    expect(res.data.holiday[0]).toHaveProperty('Date');
  });

  it('Get all holidays for a country', async () => {
    res = await query({ query: GET_COUNTRY });
    expect(res.data.country.length).toBe(31);
    expect(res.data.country[0]).toHaveProperty('HolidayName');
    expect(res.data.country[0]).toHaveProperty('CountryName');
    expect(res.data.country[0]).toHaveProperty('Date');
  });
  it('Get all holidays in the indicated range', async () => {
    res = await query({ query: GET_RANGE });
    expect(res.data.rangeDates.length).toBe(21);
    expect(res.data.rangeDates[0]).toHaveProperty('HolidayName');
    expect(res.data.rangeDates[0]).toHaveProperty('CountryName');
    expect(res.data.rangeDates[0]).toHaveProperty('Date');
  });
});
