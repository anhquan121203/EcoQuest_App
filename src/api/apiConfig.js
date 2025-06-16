const BASE_URL = 'http://160.250.246.33:5269';

const API = {
  BASE_URL,
  LOGIN: `${BASE_URL}/connect/token`,
  REGISTER: `${BASE_URL}/api/v1/Ecq010InsertUser`,
  VERIFY: `${BASE_URL}/api/v1/Ecq010InsertUserVerify`,

  // api home
  ATTRACTION: `${BASE_URL}/api/v1/Ecq100SelectAttractions`,
  ATTRACTION_BY_ID: `${BASE_URL}/api/v1/Ecq100SelectAttraction`,

  // api hotel
  HOTEL: `${BASE_URL}/api/v1/Ecq100SelectHotels`, 
  HOTEL_BY_ID: `${BASE_URL}/api/v1/Ecq100SelectHotel`,

  // api blog
  BLOG: `${BASE_URL}/api/v1/Ecq100SelectBlogs`,
  BLOG_BY_ID: `${BASE_URL}/api/v1/Ecq100SelectBlog`,

  // api destination
  DESTINATION: `${BASE_URL}/api/v1/Ecq200SelectDestinations`,
  DESTINATION_BY_ID: `${BASE_URL}/api/v1/Ecq200SelectDestination`,
  CREATE_DESTINATION: `${BASE_URL}/api/v1/Ecq200InsertDestination`,
  UPDATE_DESTINATION: `${BASE_URL}/api/v1/Ecq200UpdateDestination`,

  // trip planner
  TRIP: `${BASE_URL}/api/v1/Ecq110SelectTrips`,
  TRIP_BY_ID: `${BASE_URL}/api/v1/Ecq110SelectTrip`,
  CREATE_TRIP: `${BASE_URL}/api/v1/Ecq110InsertTrip`,
  UPDATE_TRIP: `${BASE_URL}/api/v1/Ecq110UpdateTrip`,
};

export default API;
