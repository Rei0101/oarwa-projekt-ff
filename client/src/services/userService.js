import axios from "axios";
import CustomError from "../../../shared/CustomErrorClass";

const API_URL = import.meta.env.VITE_API_URL;

const userService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
      );
    }
  },
  register: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500
      );
    }
  },
};

export default userService;
