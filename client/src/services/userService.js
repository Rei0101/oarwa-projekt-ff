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
      if (!error?.status || !error?.response?.status) {
        throw new CustomError(401);
      }
      throw new CustomError(error?.status || error?.response?.status || 500);
    }
  },
  register: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      return response.data;
    } catch (error) {
      if (error?.status === 409 || error?.response?.status === 409) {
        throw new CustomError(
          409,
          "Ovaj korisnik već postoji. Molimo pokušajte ponovno."
        );
      }
      throw new CustomError(error?.status || error?.response?.status || 500);
    }
  },
  changePassword: async (id, currentPassword, newPassword) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${API_URL}/users/change-password`,
        {
          id,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      if (error?.status === 401 || error?.response?.status === 401) {
        throw new CustomError(401, "Lozinke se ne podudaraju.");
      }
      if (error?.status === 403 || error?.response?.status === 403) {
        throw new CustomError(403, "Niste ovlašteni za ovu akciju.");
      }
      if (error?.status === 400 || error?.response?.status === 400) {
        throw new CustomError(
          error?.status || error?.response?.status || 500,
          "Nova lozinka treba sadržavati minimalno: 8 znakova, 1 veliko slovo, 3 broja i 1 (česti) interpunkcijski znak."
        );
      }
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Dogodila se greška pri promjeni lozinke."
      );
    }
  },
};

export default userService;
