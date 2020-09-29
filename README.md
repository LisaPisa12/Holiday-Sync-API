# Holiday-Sync-API

<p align="center">
  <img src="./apiLogo/apiLogo.png" width="150">
</p>

<h1 align="center">Holidays GraphQL API</h1>


A public GraphQL API for information about holidays, countries, and dates. This project uses data obtained from Web Scrapping to retrieve holidays around the world. Don't ever miss a holiday again or ask your employees to ever work on one. This API will retrieve the holidays based on the country name, country or date range. 

## Writing queries

```graphql
{
   country(name:"Spain"){
    HolidayName
    CountryName
    Date
  }
}
```

The above GraphQL query will produce the following JSON response:

```json
{
  "data": {
    "country": [ {
        "HolidayName": " Saint Vincent the Martyr ",
        "Date": "January22nd2020"
      },
      {
        "HolidayName": " Andalucía Day ",
        "Date": "February28th2020"
      },
      {
        "HolidayName": " Balearic Day ",
        "Date": "March1st2020"
      },
      {
        "HolidayName": " Feast of San Vincent Ferrer ",
        "Date": "April20th2020"
      }]
  }
}
```

## Docs

Check out [the playground](link to playground will go here) to explore the schema and test out some queries.