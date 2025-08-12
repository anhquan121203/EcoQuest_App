import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, paymentCallBack } from "../feartures/payment/paymentSlice";

const usePayment = () => {
  const {
    payments,
    loading,
    error,
  } = useSelector((state) => state.payment);
  const dispatch = useDispatch();

  

  // create trip
  // const addNewtrip = async (tripData) => {
  //   dispatch(createTrip(tripData));
  //   fetchTrips();
  // }

  const addNewPayment = async (paymentData) => {
    try {
      const resultAction = await dispatch(createPayment(paymentData));

      // unwrap kết quả để lấy data từ payload (RTK way)
      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("addNewtrip error:", error);
      return { success: false, error };
    }
  };

  const paymentCallback = async (paymentData) => {
    try {
      // Gọi thunk và unwrap để lấy kết quả hoặc throw error
      const data = await dispatch(paymentCallBack(paymentData)).then(unwrapResult);
      return { success: true, data };
    } catch (error) {
      console.error("paymentCallback error:", error);
      return { success: false, error };
    }
  };

  return {
    payments,
    loading,
    error,
    addNewPayment
  };
};

export default usePayment;
