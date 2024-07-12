import React, { useState } from 'react';
import MapChart from './MapChart';
import TripForm from './TripForm';
import TripList from './TripList';

const Home = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    const refreshVisitedListOnFormSubmit = () => {
        setRefreshKey(prev => prev+1);
    }
  return (
    <>
        <MapChart key={refreshKey} />
        <TripForm refreshTrips={refreshVisitedListOnFormSubmit} />
        <TripList key={refreshKey} />
    </>
  )
}

export default Home;