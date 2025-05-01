import axios from "axios";
import CustomError from "../../../shared/CustomErrorClass";

const API_URL = import.meta.env.VITE_API_URL;

const collectionService = {
  fetch: async (collectionName) => {
    try {
      const response = await axios.get(`${API_URL}/${collectionName}`);
      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Tražene stavke nisu uspješno dohvaćene."
      );
    }
  },
  create: async (collectionName, data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(`${API_URL}/${collectionName}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Zadana stavka nije uspješno kreirana."
      );
    }
  },
};

export default collectionService;
