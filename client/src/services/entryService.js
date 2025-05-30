import axios from "axios";
import CustomError from "../../../shared/CustomErrorClass";

const API_URL = import.meta.env.VITE_API_URL;

const entryService = {
  fetchOne: async (collectionName, id) => {
    try {
      const response = await axios.get(`${API_URL}/${collectionName}/${id}`);
      return response.data[0];
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Tražena stavka nije uspješno dohvaćena."
      );
    }
  },
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
  fetchByQuery: async (collectionName, q) => {
    try {
      const response = await axios.get(`${API_URL}/${collectionName}?q=${q}`);
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
  partiallyUpdate: async (collectionName, id, data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.patch(
        `${API_URL}/${collectionName}/${id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Stavka nije uspješno ažurirana."
      );
    }
  },
  fullyUpdate: async (collectionName, id, data) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${API_URL}/${collectionName}/${id}`,
        data,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Stavka nije uspješno ažurirana."
      );
    }
  },
  delete: async (collectionName, id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `${API_URL}/${collectionName}/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Stavka nije uspješno izbrisana."
      );
    }
  },
};

export default entryService;
