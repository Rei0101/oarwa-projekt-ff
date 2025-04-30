import mongoose from "mongoose";

const isObjectIdInCollection = async (objectId, collection) => {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    return false;
  }
  const result = await collection.findOne({ _id: objectId });
  return result !== null;
};

export { isObjectIdInCollection };
