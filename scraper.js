const puppeteer = require('puppeteer');
const Countries = require('./server/data/models/countries');
const Dates = require('./server/data/models/dates');
const Holidays  = require('./server/data/models/holidays');

//


const url = 'https://www.officeholidays.com/calendars/2020/1/1';  // will need to replace the date part of make it interactive
//`https://www.officeholidays.com/calendars/${year}/${month}/${day}`;


async function scrapeHolidays(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // const year = await page.evaluate(()=> document.querySelector('.nav_h1').textContent.slice(-4));
  // console.log(year);
  // const holidayName  = await page.evaluate(()=> Array.from(document.querySelectorAll('.country-listing'), element => element.textContent));
  // console.log(holidayName);
  // const date  = await page.evaluate(()=> Array.from(document.querySelectorAll('tbody > tr > td > time'), element => element.textContent));
  // console.log(date);

  const holidayDate = await page.evaluate(()=>document.querySelector('div.seven > h2').textContent);
  const date = holidayDate.substring(11); //this is for the database. convert to date format
  const list = await page.evaluate(()=> Array.from(document.querySelectorAll('a.img-caption > figure > figcaption > h3'), element=>(element.textContent).replace(' (regional)','')));

 
  console.log(date);
  console.log(list);

  browser.close();
  return { date, list};
}

const yearDict = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
for (let i = 0; i <= yearDict.length; i++) {
  const month = i + 1;
  for (let day = 1; day <= yearDict[i]; day++) {
    const date = `2020/${month}/${day}`;
  //  console.log(`2020/${month}/${day}`)
  }
}


function extractIndividualData(list, date ) {

  const countryEntry = {};
  const holidayEntry = {};
  const dateEntry = {};

  for (let item = 0; item < list.length; item++) {
    const colon = item.indexOf(':');
    countryEntry.CountryName = list.slice(0, colon);
    holidayEntry.HolidayName = list.slice(colon+1);
    dateEntry.Date = date;

    Countries.create(countryEntry);
    Holidays.create(holidayEntry);
    Dates.create(dateEntry);
    

  }
}



;
extractIndividualData(scrapeHolidays(url));

