import mongoose from "mongoose";

const getCollectionData = async (collectionName) => {
  try {
    const collection = mongoose.connection.collection(collectionName);

    const documents = await collection.find().toArray();

    return documents;
  } catch (error) {
    throw new Error("Error getting collection data");
  }
};

export { getCollectionData };
