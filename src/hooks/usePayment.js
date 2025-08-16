import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPayment, paymentCallBack, paymentHistory, paymentPremier, paymentPremierCallback, rePayment } from "../feartures/payment/paymentSlice";
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

const sendBackPayment = async (paymentData) => {
    try {
      const resultAction = await dispatch(rePayment(paymentData));

      // unwrap kết quả để lấy data từ payload (RTK way)
      const data = await resultAction.payload;
      return { success: true, data };
    } catch (error) {
      console.error("sendBackPayment error:", error);
      return { success: false, error };
    }
  };


    const listPaymentHistory = useCallback(
    () => {
      dispatch(paymentHistory());
    },
    [dispatch]
  );

  const paymentURLCallBack = async ({ tripId, code, cancel }) => {
    try {
      const resultAction = await dispatch(paymentCallBack({ tripId, code, cancel }));
      const data = unwrapResult(resultAction);
      console.log("Payment callback response:", data);
      return { success: true, data };
    } catch (error) {
      console.error("Payment callback error:", error);
      return { success: false, error };
    }
  };

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
    paymentURLCallBack,
    listPaymentHistory,
    createPremier,
    paymentPremierURLCallBack,
    sendBackPayment
  };
};

export default usePayment;
