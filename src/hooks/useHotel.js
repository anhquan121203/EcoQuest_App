import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getHotelById, listHotel } from "../feartures/hotels/hotelSlice";

const useHotel = () => {
  const { hotels, selectedHotel, loading, error } = useSelector(
    (state) => state.hotel
  );
  const dispatch = useDispatch();

  const fetchHotels = useCallback(
    () => {
      dispatch(listHotel());
    },
    [dispatch]
  );

  const hotelById = async (id) => {
    dispatch(getHotelById(id));
  }

  // console.log(fetchAttractions)

  
  return {
    hotels,
    selectedHotel,
    loading,
    error,
    fetchHotels ,
    hotelById
  };
};

export default useHotel;
