import React, { useState, useEffect } from 'react';
import { createTrip } from '../services/api';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

const TripForm = ({ countryNames, onTripAdded }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [dateVisited, setDateVisited] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSelectCountry = (event) => {
        setSelectedCountry(event.target.value);
    }

    const handleSetDate = (event) => {
        setDateVisited(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const trip = {
                country: selectedCountry,
                date_visited: dateVisited,
            };
            await createTrip(trip);
            setSelectedCountry('');
            setDateVisited('');
            onTripAdded();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ m: 4 }}>
            {error && <Alert severity="error">{error}</Alert>}
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        margin='normal'
                        required
                        fullWidth
                        id='country'
                        label='Select Country'
                        value={selectedCountry}
                        onChange={handleSelectCountry}
                        helperText='Please select the country you visited'
                    >
                        {countryNames.map((country, index) => (
                            <MenuItem key={index} value={country}>
                                {country}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="dateVisited"
                        label="Date Visited"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={dateVisited}
                        onChange={handleSetDate}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
            >
                {loading ? 'Adding...' : 'Add Trip'}
            </Button>
        </Box>
    );
};

export default TripForm;