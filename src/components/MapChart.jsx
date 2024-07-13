import React, { useState, useEffect, useContext } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { getUserProfile, getVisitedCountries } from '../services/api';
import AuthContext from '../contexts/AuthContext';
import Box from '@mui/material/Box';
import geoUrl from '../countries-110m.json';
import Alert from "@mui/material/Alert";

const MapChart = ({ refreshKey }) => {
  const [currentCountry, setCurrentCountry] = useState("filler");
  const [hovered, setHovered] = useState(false);
  const [homeCountry, setHomeCountry] = useState('');
  const [visitedCountries, setVisitedCountries] = useState([]);
  const { userId } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        if (userId) {
          const countries = await getVisitedCountries();
          setVisitedCountries(countries);
          const { home_country } = await getUserProfile();
          setHomeCountry(home_country);
        }
      } catch (error) {
        setError(error.message);
      }
    };
    fetchUserInfo();
  }, [userId, refreshKey]);

  return (
    <div className="m-4 box-border flex flex-col justify-center items-center h-full lg:h-[65vh]">
      {error && <Alert severity='error'>{error}</Alert>}
      <div className={`flex justify-center text-xl ${hovered ? 'visible' : 'invisible'}`}>{currentCountry}</div>
      <ComposableMap data-tip="" projectionConfig={{
          scale: 200
        }}
        style={{ backgroundColor: 'blue' }} >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isVisited = visitedCountries.includes(geo.properties.name);
              const isHomeCountry = geo.properties.name === homeCountry;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    setCurrentCountry(geo.properties.name)
                    setHovered(true);
                  }}
                  onMouseLeave={() => {
                    setHovered(false);
                  }}
                  style={{
                    default: {
                      fill: isHomeCountry ? '#daa520' : isVisited ? 'green' : 'lightgray',
                      outline: 'none'
                    },
                    hover: {
                      fill: isHomeCountry ? '#b8860b' : isVisited ? 'darkgreen' : 'darkgray',
                      outline: "none"
                    },
                    pressed: {
                      fill: isHomeCountry ? '#b8860b' : isVisited ? 'darkgreen' : 'darkgray',
                      outline: 'none'
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default MapChart;