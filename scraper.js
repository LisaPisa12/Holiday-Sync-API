const puppeteer = require('puppeteer');
const db = require('./server/data/models');

async function scrapeHolidays(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const holidayDate = await page.evaluate(() => document.querySelector('div.seven > h2').textContent);
  const date = holidayDate.substring(11); //this is for the database. convert to date format
  const list = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a.img-caption > figure > figcaption > h3'), (element) => element.textContent.replace(' (regional)', ''))
  );

  const countries = db.sequelize.models.countries;
  const holidays = db.sequelize.models.holidays;
  const dates = db.sequelize.models.dates;

  let countryEntry = '';
  let holidayEntry = '';
  let dateEntry = '';

  for (let item = 0; item < list.length; item++) {
    let countryName = list[item].split(':');
    countryEntry = countryName[0].trim();
    holidayEntry = countryName[1].trim();
    dateEntry = date.trim();

    try {
      const [country] = await countries.findOrCreate({ where: { CountryName: countryEntry } });
      const [holiday] = await holidays.findOrCreate({ where: { HolidayName: holidayEntry, countryId: country.id } }); //, { defaults: { HolidayName:holidayEntry, countryId: country.id}}
      await dates.findOrCreate({ where: { Date: dateEntry, holidayId: holiday.id } }); //, { defaults: { Date:dateEntry, holidayId: holiday.id}}
    } catch (error) {
      console.log(error);
    }
  }

  //example where to
  // const holiday = await holidays.findByPk(1, { include: countries })
  // console.log(holiday.country.CountryName)
  browser.close();
}

const yearDict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
async function scrapeManyHolidays() {
  for (let i = 0; i <= yearDict.length; i++) {
    const month = i + 1;
    for (let day = 1; day <= yearDict[i]; day++) {
      const date = `2020/${month}/${day}`;
      const url = `https://www.officeholidays.com/calendars/${date}`;
      await scrapeHolidays(url);
    }
  }
}

// const url= `https://www.officeholidays.com/calendars/2020/1/17`
// scrapeHolidays(url)
scrapeManyHolidays();
