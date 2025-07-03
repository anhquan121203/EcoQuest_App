import apiClient from "./apiClient";
import API from "./apiConfig";

export const loginUser = async (email, password) => {

  const data = new URLSearchParams();
  data.append("grant_type", "password");
  data.append("username", email);
  data.append("password", password);
  data.append("Email", email);


  const response = await apiClient.post(API.LOGIN, data.toString(), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });
  return response;
};

export const registerUser = async (userData) => {
  const response = await apiClient.post(API.REGISTER, userData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const verifyUser = async ({ email, key }) => {
  const response = await apiClient.post(API.VERIFY, { email, key }, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
