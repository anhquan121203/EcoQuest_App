import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDestinationById, listDestination } from "../feartures/destination/destinationSlice";


const useDestination = () => {
  const { destinations, selectedDestination, loading, error } = useSelector(
    (state) => state.destination
  );
  const dispatch = useDispatch();

  const fetchDestinations = useCallback(
    () => {
      dispatch(listDestination());
    },
    [dispatch]
  );

  const destinationById = async (id) => {
    dispatch(getDestinationById(id));
  }

  // console.log(fetchAttractions)

  
  return {
    destinations,
    selectedDestination,
    loading,
    error,
    fetchDestinations ,
    destinationById
  };
};

export default useDestination;
