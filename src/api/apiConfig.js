const BASE_URL = 'http://160.250.246.33:5269';

const API = {
  BASE_URL,
  LOGIN: `${BASE_URL}/connect/token`,
  REGISTER: `${BASE_URL}/api/v1/Ecq010InsertUser`,
  VERIFY: `${BASE_URL}/api/v1/Ecq010InsertUserVerify`,
};

export default API;
