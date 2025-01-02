import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Backend server URL

// Fetch all cars
export const fetchCars = async (token) => {
    const response = await axios.get(`${API_BASE_URL}/cars`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Add or update a car
export const upsertCar = async (car, token) => {
    const response = await axios.post(`${API_BASE_URL}/cars`, car, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

// Generate JWT token
export const generateToken = async () => {
    const response = await axios.get(`${API_BASE_URL}/token`);
    return response.data;
};
