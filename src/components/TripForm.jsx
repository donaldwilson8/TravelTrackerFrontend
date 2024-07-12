import React, { useState, useEffect, useContext } from 'react';
import { getCountries, createTrip } from '../services/api';
import AuthContext from '../contexts/AuthContext';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

const TripForm = ({ refreshTrips }) => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [dateVisited, setDateVisited] = useState('');
    const { userId } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesData = await getCountries();
                setCountries(countriesData);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCountries();
    }, []);

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
        } catch (error) {
            setError(error.message);
        } finally {
            refreshTrips();
            setLoading(false);
        }
    };

    return (
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
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
                {countries.map((country, index) => (
                    <MenuItem key={index} value={country}>
                        {country}
                    </MenuItem>
                ))}
            </TextField>
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
