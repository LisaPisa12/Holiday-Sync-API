import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import TodayList from './component/TodayList'
import { gql } from '@apollo/client';


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

    <ApolloProvider client={client}>
    <div className="holidays_dates">
      <TodayList></TodayList>
    </div>
  <style jsx>{`.holidays_dates{
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
}`}</style>
    </ApolloProvider>
 
  );
}

export default App;
