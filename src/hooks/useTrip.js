import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTripById, listTrip } from "../feartures/trip/tripSlice";

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

  // console.log(fetchAttractions)

  
  return {
    trips,
    selectedTrip,
    loading,
    error,
    fetchTrips,
    tripById
  };
};

export default useTrip;
