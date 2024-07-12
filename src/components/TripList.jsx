import React, { useState, useEffect, useContext } from 'react';
import { getTrips, deleteTrip } from '../services/api';
import TripItem from './TripItem';
import AuthContext from '../contexts/AuthContext';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const TripList = () => {
    const [trips, setTrips] = useState([]);
    const { userId } = useContext(AuthContext);

    const refreshTrips = async () => {
        const trips = await getTrips(userId);
        setTrips(trips);
    };

    useEffect(() => {
        refreshTrips();
    }, [userId]);

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom>
                Visited Countries
            </Typography>
            <Box>
                {trips.map(trip => (
                    <TripItem key={trip.id} trip={trip} deleteTrip={deleteTrip} refreshTrips={refreshTrips} />
                ))}
            </Box>
        </Box>
    );
};

export default TripList;