//import { ApolloClient, InMemoryCache } from '@apollo/client';

import React from 'react';
import { gql } from '@apollo/client';
import { useQuery} from '@apollo/client';




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
          <p>{HolidayName}</p>
          <p>{CountryName}</p>
          <p>{Date}</p>

    <style jsx>{`
    .data{
      display:flex; 
      flex-direction:row; 
      justify-content:center; 
      align-items:center;
      gap: 1em;
    }
      `}</style>
        </div>
  
    ));
   }

 export default GetToday;