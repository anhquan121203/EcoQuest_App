import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServiceByType } from "../feartures/service/serviceSlice";

const useService = () => {
  const { services, selectedService, loading, error } = useSelector(
    (state) => state.service
  );
  const dispatch = useDispatch();

  const serviceByType = async (id) => {
    dispatch(getServiceByType(id));
  };

  return {
    services,
    selectedService,
    loading,
    error,
    serviceByType,
  };
};

export default useService;
