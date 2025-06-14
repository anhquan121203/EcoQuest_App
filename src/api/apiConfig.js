const BASE_URL = 'http://160.250.246.33:5269';

const API = {
  BASE_URL,
  LOGIN: `${BASE_URL}/connect/token`,
  REGISTER: `${BASE_URL}/api/v1/Ecq010InsertUser`,
  VERIFY: `${BASE_URL}/api/v1/Ecq010InsertUserVerify`,

  // api home
  ATTRACTION: `${BASE_URL}/api/v1/Ecq230SelectAttractions`,
  ATTRACTION_BY_ID: `${BASE_URL}/api/v1/Ecq230SelectAttraction`,

  // api hotel
  HOTEL: `${BASE_URL}/api/v1/Ecq210SelectHotels`, 
  HOTEL_BY_ID: `${BASE_URL}/api/v1/Ecq210SelectHotel`,
};

export default API;
