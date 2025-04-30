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
        error?.response?.status || 500,
        error?.message || "Tražene stavke nisu uspješno dohvaćene."
      );
    }
  },
};

export default collectionService;
