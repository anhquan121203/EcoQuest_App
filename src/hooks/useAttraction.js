import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAttractionById, listAttraction } from "../feartures/attraction/attractionSlice";

const useAttraction = () => {
  const { attractions, selectedAttraction, loading, error } = useSelector(
    (state) => state.attraction
  );
  const dispatch = useDispatch();

  const fetchAttractions = useCallback(
    () => {
      dispatch(listAttraction());
    },
    [dispatch]
  );

  const attractionById = async (id) => {
    dispatch(getAttractionById(id));
  }

  // console.log(fetchAttractions)

  
  return {
    attractions,
    selectedAttraction,
    loading,
    error,
    fetchAttractions,
    attractionById
  };
};

export default useAttraction;
