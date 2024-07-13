import React, { useState, useEffect, useContext } from 'react';
import { getTrips, deleteTrip } from '../services/api';
import TripItem from './TripItem';
import AuthContext from '../contexts/AuthContext';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

const TripList = ({ refreshKey, onTripDeleted }) => {
    const [trips, setTrips] = useState([]);
    const { userId } = useContext(AuthContext);
    const [error, setError] = useState(null);

    const refreshTrips = async () => {
        try {
            const trips = await getTrips(userId);
            setTrips(trips);
        } catch (e) {
            setError(e.message);
        }
    };

    useEffect(() => {
        if (userId) {
            refreshTrips();
        }
    }, [userId, refreshKey]);

    return (
        <div>
            <h2 className='px-2 text-2xl'>Visited Countries</h2>
            {error && <Alert severity='error'>{error}</Alert>}
            <List>
                {trips.map(trip => (
                    <TripItem key={trip.id} trip={trip} deleteTrip={deleteTrip} onTripDeleted={onTripDeleted} />
                ))}
            </List>
        </div>
    );
};

export default TripList;