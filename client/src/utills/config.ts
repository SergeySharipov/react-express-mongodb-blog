const DEV_API_URL = 'http://localhost:3001';
const API_URL = process.env.NODE_ENV === "development" ? DEV_API_URL : '';

export default API_URL