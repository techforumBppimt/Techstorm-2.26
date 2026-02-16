// API Configuration
// Use environment variable in production, fallback to localhost in development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default API_URL;
