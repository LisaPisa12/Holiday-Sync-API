// const graphql = require('../server/server');

const supertest = require('supertest');
// const { stopDatabase } = require('../src/database');

const request = supertest('http://localhost:3000');

// afterAll(async () => {
//   await stopDatabase();
// });

test('Date query gets all the Holiday entries for that entry', async (done) => {
  request
    .post('/graphql')
    .send({
      query: '{date(date:"2020 11 17"){HolidayName CountryName}}',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.date.length).toEqual(7);
    });
});

test('Date query has Country and holiday properties', async (done) => {
  request
    .post('/graphql')
    .send({
      query: '{date(date:"2020 07 21"){HolidayName CountryName}}',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.date[0]).toHaveProperty('ContryName');
      expect(res.body.data.date[0]).toHaveProperty('HolidayName');
      done();
    });
});

test('test today query gets holiday for the day', async (done) => {
  request
    .post('/graphql')
    .send({
      query: '{today {HolidayName CountryName}}',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.today.length).toBeGreaterThan(0);
      done();
    });
});

test('Date range query gets all the Holiday entries for that entry', async (done) => {
  request
    .post('/graphql')
    .send({
      query: '{rangeDates(datesrange:"2020 11 17 2020 11 18") {HolidayName CountryName}}',
    })
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body.data.rangeDates.length).toEqual(21);
      done();
    });
});
