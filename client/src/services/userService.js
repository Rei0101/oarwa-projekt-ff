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
        error?.response.status || 500,
        error?.message || "Korisnik nije uspješno prijavljen."
      );
    }
  },
  register: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.response?.status || 500,
        error?.message || "Korisnik nije uspješno registriran."
      );
    }
  },
};

export default userService;
