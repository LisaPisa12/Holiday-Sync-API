//import { ApolloClient, InMemoryCache } from '@apollo/client';

import React from 'react';
import { gql } from '@apollo/client';
import { useQuery} from '@apollo/client';
import moment from 'moment';



const today =  gql`
query   {
  today { 
    HolidayName
    CountryName
    Date
  }
}
`

  const GetToday = () => {
   
    const { loading, error, data } = useQuery(today);
 
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.today.map(({ HolidayName, CountryName, Date }) => (
     
  
        <div className="data">
          
          <p><strong>{HolidayName}</strong></p>
          <p>{CountryName}</p>
          <p>{moment().format('MMMM Do YYYY')}</p>

    <style jsx>{`
    .data{
      display:flex;
      flex-direction:column; 
      justify-content:center; 
      align-items:center;
      border:1px solid;
      border-radius:16px;
      width:25%;
      margin: 1em;
    }
      `}</style>
        </div>
      
    ));
   }

 export default GetToday;