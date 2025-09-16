const BASE_URL = process.env.EXPO_PUBLIC_API_URL;


const API = {
  BASE_URL,
  LOGIN: `${BASE_URL}/connect/token`,
  REGISTER: `${BASE_URL}/api/v1/Ecq010InsertUser`,
  VERIFY: `${BASE_URL}/api/v1/Ecq010InsertUserVerify`,

  // api user
  USER: `${BASE_URL}/api/v1/Ecq300SelectUser`,

  // api home
  ATTRACTION: `${BASE_URL}/api/v1/Ecq100SelectAttractions`,
  ATTRACTION_BY_ID: `${BASE_URL}/api/v1/Ecq100SelectAttraction`,

  // api hotel
  HOTEL: `${BASE_URL}/api/v1/Ecq100SelectHotels`, 
  HOTEL_BY_ID: `${BASE_URL}/api/v1/Ecq100SelectHotel`,
  ROOM_BY_HOTEL: `${BASE_URL}/api/v1/Ecq211SelectHotelRooms`,

  // api blog
  BLOG: `${BASE_URL}/api/v1/Ecq100SelectBlogs`,
  BLOG_BY_ID: `${BASE_URL}/api/v1/Ecq100SelectBlog`,
  CREATE_BLOG: `${BASE_URL}/api/v1/Ecq100InsertBlog`,

  // api destination
  DESTINATION: `${BASE_URL}/api/v1/Ecq200SelectDestinations`,
  DESTINATION_BY_ID: `${BASE_URL}/api/v1/Ecq200SelectDestination`,

  // trip planner
  TRIP: `${BASE_URL}/api/v1/Ecq110SelectTrips`,
  TRIP_BY_ID: `${BASE_URL}/api/v1/Ecq110SelectTrip`,
  CREATE_TRIP: `${BASE_URL}/api/v1/Ecq110InsertTrip`,
  UPDATE_TRIP: `${BASE_URL}/api/v1/Ecq110UpdateTrip`,
  DELETE_TRIP: `${BASE_URL}/api/v1/Ecq110DeleteTrip`,

  CREATE_TRIP_SCHEDULE: `${BASE_URL}/api/v1/Ecq110InsertTripSchedule`,
  GET_TRIP_SCHEDULE_BY_TRIPID: `${BASE_URL}/api/v1/Ecq110SelectTripSchedule`,
  CREATE_TRIP_SCHEDULE_AI: `${BASE_URL}/api/v1/Ecq110InsertTripScheduleWithAi`,
  BOOKING_HOTEL_ROOM: `${BASE_URL}/api/v1/Ecq110InsertBookingTrip`,

  // api payment
  PAYMENT: `${BASE_URL}/api/v1/Ecq110InsertPayment`,
  PAYMENT_CALLBACK: `${BASE_URL}/api/v1/Ecq110PaymentCallback`,
  PAYMENT_HISTORY: `${BASE_URL}/api/v1/Ecq300SelectPaymentBookings`,
  RE_PAYMENT: `${BASE_URL}/api/v1/Ecq110RePayment`,

  // payment premier
  PAYMENT_PREMIER: `${BASE_URL}/api/v1/Ecq300PaymentPremierAccount`,
  PAYEMNT_PREMIER_CALLBACK: `${BASE_URL}/api/v1/Ecq300PaymentPremierCallback`,

  // api service
  SERVICE: `${BASE_URL}/api/v1/Ecq110SelectService`,

  // api comment
  COMMENT: `${BASE_URL}/api/v1/Ecq100SelectComments`,
  CREATE_COMMENT: `${BASE_URL}/api/v1/Ecq100InsertComment`
};

export default API;
