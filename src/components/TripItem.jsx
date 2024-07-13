import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Alert from "@mui/material/Alert";

const TripItem = ({ trip, deleteTrip, onTripDeleted }) => {
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await deleteTrip(trip.id);
            onTripDeleted();
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <>
            {error && <Alert severity='error'>{error}</Alert>}
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
        </>
    );
};

export default TripItem;