const resolvers = require('../server/graphql/resolvers/query.resolvers');
const db = require('../server/data/models');
const moment = require('moment');

const mockDay1 = [
  {
    holiday: {
      HolidayName: 'Orc emancipation day',
      CountryName: 'Mordor',
    },
  },
];
const mockDay2 = [
  {
    holiday: {
      HolidayName: 'Wraith ascendance day',
      CountryName: 'Mordor',
      Date: moment().format('MMMM Do YYYY'),
    },
  },
  {
    holiday: {
      HolidayName: 'Sauron and precious reunification',
      CountryName: 'Mordor',
      Date: moment().format('MMMM Do YYYY'),
    },
  },
];
const mockCountry = {
  holidays: [{ HolidayName: 'test' }],
};

const mockrange = [
  {
    holiday: {
      HolidayName: 'defeat of voldemort',
      CountryName: 'diagon alley',
      Date: moment('2020/07/07').format('MMMM Do YYYY'),
    },
  },
  {
    holiday: {
      HolidayName: 'Return of he who cannot be named',
      CountryName: 'EVERYWHERE',
      Date: moment('2020/07/08').format('MMMM Do YYYY'),
    },
  },
];

jest.mock('../server/data/models', () => ({
  sequelize: {
    models: {
      holidays: () => {},
      dates: () => {},
      countries: () => {},
    },
  },
  Sequelize: {
    Op: () => {},
  },
}));
-(
 

  describe('get date query', () => {
    const date = '2020/10/07';

    it('should return 1 entry', async () => {
      db.sequelize.models.dates.findAll = jest.fn();
      db.sequelize.models.dates.findAll.mockResolvedValue(mockDay1);
      let res = await resolvers.date({}, date);
      expect(db.sequelize.models.dates.findAll).toHaveBeenCalledTimes(1);
      expect(res[0].HolidayName).toBe('Orc emancipation day');
    });
  })
);

describe('get today query', () => {
  it('should return 2 entry', async () => {
    db.sequelize.models.dates.findAll = jest.fn();
    db.sequelize.models.dates.findAll.mockResolvedValue(mockDay2);
    let res = await resolvers.today();
    expect(db.sequelize.models.dates.findAll).toHaveBeenCalledTimes(1);
    expect(res.length).toBe(2);
    expect(res[1].HolidayName).toBe('Sauron and precious reunification');
  });
});

describe('get holidays query', () => {
  const name = 'Wraith';

  it('should return 1 entry', async () => {
    db.sequelize.models.holidays.findAll = jest.fn();
    db.sequelize.models.holidays.findAll.mockResolvedValue(mockDay2[0]);
    let res = await resolvers.holiday({}, name);
    expect(db.sequelize.models.holidays.findAll).toHaveBeenCalledTimes(1);
    expect(res.holiday.HolidayName).toBe('Wraith ascendance day');
  });
});

describe('get country query', () => {
  const name = 'Mordor';

  it('should return 2 entry', async () => {
    db.sequelize.models.countries.findOne = jest.fn();
    db.sequelize.models.countries.findOne.mockResolvedValue(mockCountry);
    let res = await resolvers.country({}, { name });
    expect(db.sequelize.models.countries.findOne).toHaveBeenCalledTimes(1);
    expect(res[0].HolidayName).toBe('test');
  });
});
