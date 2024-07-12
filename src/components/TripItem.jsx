import React from 'react';
import { FaTrash } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const TripItem = ({ trip, deleteTrip, refreshTrips }) => {
    const handleDelete = async () => {
        await deleteTrip(trip.id);
        refreshTrips();
    };

    return (
        <ListItem
            secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={handleDelete}>
                    <FaTrash />
                </IconButton>
            }
        >
            <ListItemText
                primary={trip.country}
                secondary={`Date Visited: ${trip.date_visited}`}
            />
        </ListItem>
    );
};

export default TripItem;