import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, paymentCallBack, paymentHistory, paymentPremier, paymentPremierCallback } from "../feartures/payment/paymentSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const usePayment = () => {
  const {
    payments,
    loading,
    error,
    premier,
    premierCallback,
  } = useSelector((state) => state.payment);
  const dispatch = useDispatch();


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

    const listPaymentHistory = useCallback(
    () => {
      dispatch(paymentHistory());
    },
    [dispatch]
  );

  const paymentPremierURLCallBack = async ({ tripId, code, cancel }) => {
    try {
      const resultAction = await dispatch(paymentPremierCallback({ tripId, code, cancel }));
      const data = unwrapResult(resultAction);
      console.log("Premier callback response:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Premier callback error:", error);
      return { success: false, error };
    }
  };

  // premier payment
   const createPremier = async () => {
    try {
      const resultAction = await dispatch(paymentPremier());
      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("Payment premier:", error);
      return { success: false, error };
    }
  };

  return {
    payments,
    premier,
    premierCallback,
    loading,
    error,
    addNewPayment,
    listPaymentHistory,
    createPremier,
    paymentPremierURLCallBack
  };
};

export default usePayment;
