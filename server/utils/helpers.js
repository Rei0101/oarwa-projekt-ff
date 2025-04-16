import mongoose from "mongoose";
import CustomError from "../../shared/CustomErrorClass.js";

const checkFieldAppearance = async (conditions, Field) => {
  for (const field in conditions) {
    if (await Field.findOne({ [field]: conditions[field] })) {
      return new CustomError(409);
    }
  }
};

const isObjectIdInCollection = async (objectId, collection) => {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    return false
  }
  const result = await collection.findOne({ _id: objectId });
  return result !== null;
}


export { checkFieldAppearance, isObjectIdInCollection };
