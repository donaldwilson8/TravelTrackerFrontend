import React, { useState, useEffect } from 'react';
import MapChart from './MapChart';
import TripForm from './TripForm';
import TripList from './TripList';
import NavBar from './NavBar';
import { getTrips } from '../services/api';
import Alert from '@mui/material/Alert';
import geoUrl from '../countries-110m.json';

const extractCountryNames = (geoData) => {
  return geoData.objects.countries.geometries.map(geo => geo.properties.name).sort();
};

const Home = () => {
  const [trips, setTrips] = useState([]);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const countryNames = extractCountryNames(geoUrl);

  const refreshTrips = async () => {
    try {
      const tripsData = await getTrips();
      setTrips(tripsData);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleTripChange = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  useEffect(() => {
    refreshTrips();
  }, [refreshKey]);

  return (
    <>
      <NavBar />
      {error && <Alert severity='error'>{error}</Alert>}
      <MapChart refreshKey={refreshKey} />
      <TripForm countryNames={countryNames} onTripAdded={handleTripChange} />
      <TripList refreshKey={refreshKey} onTripDeleted={handleTripChange} />
    </>
  )
}

export default Home;