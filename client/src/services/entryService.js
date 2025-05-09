import axios from "axios";
import CustomError from "../../../shared/CustomErrorClass";

const API_URL = import.meta.env.VITE_API_URL;

const entryService = {
  fetchAll: async (collectionName) => {
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
  add: async (collectionName, data) => {
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
  delete: async (collectionName, id) => {
    try {
      const token = localStorage.getItem("token");
      
      const response = await axios.delete(`${API_URL}/${collectionName}/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Stavka sa zadanim ID-om nije uspješno izbrisana."
      );
    }
  },
};

export default entryService;
