import mongoose from "mongoose";
import CustomError from "../../shared/CustomErrorClass.js";

const handleCollection = async (collectionName) => {
  try {
    const collection = mongoose.connection.collection(collectionName);

    const documents = await collection.find().toArray();

    return documents;
  } catch (error) {
    throw new CustomError(500);
  }
};

const handleUserRole = (email) => {
  if (email.split("@")[1] === "mym.hr") {
    return "admin";
  }
  return "user";
};

export { handleCollection, handleUserRole };
