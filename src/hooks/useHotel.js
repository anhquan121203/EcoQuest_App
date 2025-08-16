import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getHotelById,
  listHotel,
  listRoomByHotel,
} from "../feartures/hotels/hotelSlice";

const useHotel = () => {
  const { hotels, selectedHotel, rooms, loading, error } = useSelector(
    (state) => state.hotel
  );
  const dispatch = useDispatch();

  const fetchHotels = useCallback(() => {
    dispatch(listHotel());
  }, [dispatch]);

  const hotelById = async (id) => {
    dispatch(getHotelById(id));
  };

  // Lấy danh sách phòng theo HotelId
  const fetchRoomsByHotel = useCallback(
    (hotelId) => {
      dispatch(listRoomByHotel(hotelId));
    },
    [dispatch]
  );

  return {
    hotels,
    selectedHotel,
    rooms,
    loading,
    error,
    fetchHotels,
    hotelById,
    fetchRoomsByHotel,
  };
};

export default useHotel;
