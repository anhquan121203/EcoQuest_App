import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTrip, getTripById, listTrip } from "../feartures/trip/tripSlice";

const useTrip = () => {
  const { trips, selectedTrip, loading, error } = useSelector(
    (state) => state.trip
  );
  const dispatch = useDispatch();

  const fetchTrips = useCallback(
    () => {
      dispatch(listTrip());
    },
    [dispatch]
  );

  const tripById = async (id) => {
    dispatch(getTripById(id));
  }

  // create trip
  const addNewtrip = async (tripData) => {
    dispatch(createTrip(tripData));
    fetchTrips();
  }

  
  return {
    trips,
    selectedTrip,
    loading,
    error,
    fetchTrips,
    tripById,
    addNewtrip
  };
};

export default useTrip;
