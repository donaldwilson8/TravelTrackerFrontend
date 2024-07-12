import React, { useState, useEffect, useContext } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { getVisitedCountries } from '../services/api';
import AuthContext from '../contexts/AuthContext';
import Box from '@mui/material/Box';
import geoUrl from '../countries-110m.json';

const MapChart = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);
  const { userId } = useContext(AuthContext);

  useEffect(() => {
    const fetchVisitedCountries = async () => {
      if (userId) {
        const countries = await getVisitedCountries();
        console.log("visited countries: ", countries);
        setVisitedCountries(countries);
      }
    };
    fetchVisitedCountries();
  }, [userId]);

  return (
    <Box sx={{ mt: 4 }}>
      <ComposableMap data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map(geo => {
              const isVisited = visitedCountries.includes(geo.properties.name);
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME } = geo.properties;
                    setTooltipContent(`${NAME}`);
                  }}
                  onMouseLeave={() => {
                    setTooltipContent("");
                  }}
                  style={{
                    default: {
                      fill: isVisited ? 'green' : 'lightgray',
                      outline: "none"
                    },
                    hover: {
                      fill: isVisited ? 'darkgreen' : 'darkgray',
                      outline: "none"
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
    </Box>
  );
};

export default MapChart;