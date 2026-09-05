import axios from 'axios';

const API_URL = 'https://careersync-backend.my.id/api/v1';

const API = axios.create({
  baseURL: API_URL
});

export default API;