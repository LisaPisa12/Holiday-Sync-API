import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import TodayList from './component/TodayList'
import { gql } from '@apollo/client';
import moment from 'moment';


const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
});


client
  .query({
    query : gql`
      query   {
        today { 
          HolidayName
          CountryName
          Date
        }
       
      }
    `
  })
  .then(result => console.log(result));

function App() {
  return (

    <div className="App">
   
    <ApolloProvider client={client}>
    <h1 className="heading">Holidays happening on: {moment().format('MMMM Do YYYY')}</h1>
        <div className="holidays_dates">
          <TodayList></TodayList>
        </div>
        <style jsx>{`.holidays_dates{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin-top:5em;
      } .heading{
        display:flex;
        flex-direction: column;
        align-items: center;
        margin-top:1em;
        margin-bottom:1em;
      } `}</style>
    </ApolloProvider>
 
 </div>
  );
  
}

export default App;
