import mongoose from "mongoose";
import { MenuItem } from "../models/menuItemModel.js";
import { Ingredient } from "../models/ingredientModel.js";
import CustomError from "../../shared/CustomErrorClass.js";

const isObjectIdInCollection = async (objectId, collection) => {
  if (!mongoose.Types.ObjectId.isValid(objectId)) {
    return false;
  }
  const result = await collection.findOne({ _id: objectId });
  return result !== null;
};

const fetchDocuments = async (collectionName, id, queryString) => {
  let documents;
  let query = {};

  try {
    if (id) {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new CustomError(400, "Invalid ID format");
      }
      query._id = new mongoose.Types.ObjectId(String(id));
    }

    if (collectionName === "menu-items") {
      if (queryString) {
        query.name = { $regex: queryString, $options: "i" };
      }

      documents = await MenuItem.find(query)
        .populate({
          path: "categories",
          options: { sort: { _id: 1 } },
        })
        .populate({
          path: "ingredients",
          options: { sort: { _id: 1 } },
          populate: {
            path: "categories",
            options: { sort: { _id: 1 } },
          },
        })
        .sort({ _id: 1 });
    } else if (collectionName === "ingredients") {
      documents = await Ingredient.find(query)
        .populate({
          path: "categories",
          options: { sort: { _id: 1 } },
        })
        .sort({ _id: 1 });
    } else {
      const collection = mongoose.connection.collection(
        collectionName.replaceAll("-", "_")
      );

      documents = await collection.find(query).sort({ _id: 1 }).toArray();
    }

    return documents;
  } catch (error) {
    throw new CustomError(500);
  }
};

const determineUserRole = (email) => {
  if (email.split("@")[1] === "mym.hr") {
    return "admin";
  }
  return "user";
};

export { isObjectIdInCollection, fetchDocuments, determineUserRole };
