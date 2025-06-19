// Get me from api - FE

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../api/apiClient";
import API from "../api/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


const useAuth = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();
   const [isLoading, setIsLoading] = useState(true);

  const token =
    useSelector((state) => state.auth.access_token) ||
    AsyncStorage.getItem("access_token");

    const fetchUserData = async () => {
      try {
        if (!token) {
          // console.log("No token found");
          return;
        }
        const response = await apiClient.get(API.USER, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data.response);
      } catch (error) {
        // console.error("Error fetch data user", error);
      

      }
    };
    useEffect(() => {
    fetchUserData();
  }, [token]);
  
  return {
    userId: user?.account_id,
    avatar: user?.avartarUrl,
    firstName: user?.firstName,
    lastName: user?.lastName,
    dob: user?.birthDate,
    gender: user?.gender,
    email: user?.email,
    user,
    refreshUserData: fetchUserData,
  };
};

export default useAuth;
