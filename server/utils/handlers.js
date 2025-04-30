import mongoose from "mongoose";
import { MenuItem } from "../models/menuItemModel.js";
import { Ingredient } from "../models/ingredientModel.js";
import CustomError from "../../shared/CustomErrorClass.js";

const handleCollection = async (collectionName) => {
  let documents;

  try {
    if (collectionName === "menu-items") {
      documents = await MenuItem.find({})
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
      documents = await Ingredient.find({})
        .populate({
          path: "categories",
          options: { sort: { _id: 1 } },
        })
        .sort({ _id: 1 });
    } else {
      const collection = mongoose.connection.collection(
        collectionName.replaceAll("-", "_")
      );
      documents = await collection.find().toArray();
    }

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
