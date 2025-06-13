import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAttraction } from "../feartures/attraction/attractionSlice";

const useAttraction = () => {
  const { attractions, loading, error } = useSelector(
    (state) => state.attraction
  );
  const dispatch = useDispatch();

  const fetchAttractions = useCallback(
    () => {
      dispatch(listAttraction());
    },
    [dispatch]
  );

  // console.log(fetchAttractions)

  
  return {
    attractions,
    loading,
    error,
    fetchAttractions,
  };
};

export default useAttraction;
