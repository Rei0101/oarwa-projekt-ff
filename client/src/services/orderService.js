import axios from "axios";
import CustomError from "../../../shared/CustomErrorClass";

const API_URL = import.meta.env.VITE_API_URL;

const orderService = {
  order: async (userId, bagItems, totalPrice) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${API_URL}/orders`,
        { userId, bagItems, totalPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      return response.data[0];
    } catch (error) {
      throw new CustomError(
        error?.status || error?.response?.status || 500,
        "Naručivanje neuspješno."
      );
    }
  },
};

export default orderService;
