import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        if (!config.url.includes('/login') && !config.url.includes('/signup')) {
            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const customError = new Error(error.response.data?.detail || error.response.statusText || 'An error occurred');
            customError.status = error.response.status;
            return Promise.reject(customError);
        } else if (error.request) {
            return Promise.reject(new Error('Network error. Please try again.'));
        } else {
            return Promise.reject(new Error(error.message));
        }
    }
);

export const login = async (username, password) => {
    const response =  await api.post('/token/', { username, password });
    console.log('Login response:', response);
    return response.data;
}

export const signup = async (username, password) => {
    const response =  await api.post('/signup/', { username, password });
    return response.data;
}

export const getCountries = async () => {
    const response =  await api.get('/countries/');
    return response.data;   
}

export const getVisitedCountries = async () => {
    const response =  await api.get(`/visited-countries/`);
    return response.data;
}

export const getTrips = async (userId) => {
    const response =  await api.get(`/trips/?user_id=${userId}/`);
    return response.data;
}

export const createTrip = async (trip) => {
    console.log("Trying to create a trip with the following:", trip);
    const response =  await api.post(`/trips/`, trip);
    return response.data;
}

export const deleteTrip = async (tripId) => {
    const response =  await api.delete(`/trips/${tripId}`);
    return response.data;
}