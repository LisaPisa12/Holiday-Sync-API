const { ApolloServer } = require('apollo-server');
const resolvers = require('../server/graphql/resolvers');
const typeDefs = require('../server/graphql/schemas');
const gql = require('graphql-tag');

const constructTestServer = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return server;
};

module.exports.constructTestServer = constructTestServer;

const GET_TODAY = gql`
  query today {
    today {
      HolidayName
      CountryName
      Date
    }
  }
`;
const GET_DATE = gql`
  query date {
    date(date: "2020/10/01") {
      HolidayName
      CountryName
    }
  }
`;

const GET_HOLIDAY = gql`
  query holiday {
    holiday(name: "Hispanic") {
      HolidayName
      CountryName
      Date
    }
  }
`;
const GET_COUNTRY = gql`
  query country {
    country(name: "spain") {
      HolidayName
      CountryName
      Date
    }
  }
`;

const GET_RANGE = gql`
  query rangeDates {
    rangeDates(datesrange: "2020/11/17-2020/11/18") {
      HolidayName
      CountryName
      Date
    }
  }
`;

module.exports.queries = {
  GET_TODAY,
  GET_DATE,
  GET_HOLIDAY,
  GET_COUNTRY,
  GET_RANGE,
};
