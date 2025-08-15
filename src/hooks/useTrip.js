import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  bookHotelRooms,
  createTrip,
  createTripSchedule,
  createTripScheduleAI,
  getTripById,
  getTripScheduleByTripId,
  listTrip,
  updateTrip,
} from "../feartures/trip/tripSlice";

const useTrip = () => {
  const {
    trips,
    tripSchedules,
    selectedTrip,
    selectedTripSchedule,
    bookingHotelRooms,
    loading,
    error,
  } = useSelector((state) => state.trip);
  const dispatch = useDispatch();

  const fetchTrips = useCallback(() => {
    dispatch(listTrip());
  }, [dispatch]);

  const tripById = async (id) => {
    dispatch(getTripById(id));
  };

  // create trip
  // const addNewtrip = async (tripData) => {
  //   dispatch(createTrip(tripData));
  //   fetchTrips();
  // }

  const addNewtrip = async (tripData) => {
    try {
      const resultAction = await dispatch(createTrip(tripData));
      fetchTrips();

      // unwrap kết quả để lấy data từ payload (RTK way)
      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("addNewtrip error:", error);
      return { success: false, error };
    }
  };

  const updateTripById = async (updateData) => {
    try {
      const resultAction = await dispatch(updateTrip(updateData));
      fetchTrips();
      // unwrap kết quả để lấy data từ payload (RTK way)
      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("addNewtrip error:", error);
      return { success: false, error };
    }
  };

  // create trip schedule
  const addNewtripSchedule = async (tripScheduleData) => {
    try {
      const resultAction = await dispatch(createTripSchedule(tripScheduleData));

      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("addNewtripSchedule error:", error);
      return { success: false, error };
    }
  };

  // update trip

  const tripScheduleByTripId = async (id) => {
    dispatch(getTripScheduleByTripId(id));
  };

  const addNewtripScheduleWithAI = async (tripScheduleAiData) => {
    try {
      const resultAction = await dispatch(createTripScheduleAI(tripScheduleAiData));

      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("add New trip Schedule AI error:", error);
      return { success: false, error };
    }
  }

  // booking hotel rooms
  const createBookHotel = async (bookingData) => {
    try {
      const resultAction = await dispatch(bookHotelRooms(bookingData));
      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("bookHotelRooms error:", error);
      return { success: false, error };
    }
  };



  return {
    trips,
    tripSchedules,
    selectedTripSchedule,
    selectedTrip,
    loading,
    error,
    fetchTrips,
    tripById,
    addNewtrip,
    addNewtripSchedule,
    tripScheduleByTripId,
    addNewtripScheduleWithAI,
    createBookHotel,
    bookingHotelRooms,
    updateTripById,
  };
};

export default useTrip;
