import { REGEX } from "../../shared/regex.js";
import mongoose from "mongoose";
import { isObjectIdInCollection } from "../utils/helpers.js";
import { Category } from "./categoryModel.js";
import { Ingredient } from "./ingredientModel.js";
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  imageLink: {
    type: String,
    validate: {
      validator: function (value) {
        return value === "" ? true : REGEX.VALID_URL.test(value);
      },
      message: (props) => `${props.value} is not a valid URL.`,
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return REGEX.LETTERS_ONLY.test(value);
      },
      message: (props) => `${props.value} is not a valid name.`,
    },
  },
  categories: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
    validate: {
      validator: async function (value) {
        if (!value || value.length === 0) {
          return false;
        }
        for (const objectId of value) {
          const objectIdExists = await isObjectIdInCollection(
            objectId,
            Category
          );
          if (!objectIdExists) {
            return false;
          }
        }
        return true;
      },
      message: (props) => {
        return props.value.length >= 1
          ? `${props.value} ${
              props.value.length === 1
                ? "is not a valid ObjectId."
                : "includes invalid ObjectId(s)."
            }`
          : "No valid ObjectId(s) provided.";
      },
    },
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Ingredient",
    default: [],
    validate: {
      validator: async function (value) {
        if (!value || value.length === 0) {
          return false;
        }
        for (const objectId of value) {
          const objectIdExists = await isObjectIdInCollection(
            objectId,
            Ingredient
          );
          if (!objectIdExists) {
            return false;
          }
        }
        return true;
      },
      message: (props) => {
        return props.value.length >= 1
          ? `${props.value} ${
              props.value.length === 1
                ? "is not a valid ObjectId."
                : "includes invalid ObjectId(s)."
            }`
          : "No valid ObjectId(s) provided.";
      },
    },
  },
  price: {
    type: Number,
    required: true,
    min: [0.01, "Price must be a positive number."],
    validate: {
      validator: function (value) {
        return REGEX.VALID_PRICE.test(value);
      },
      message: (props) => `${props.value} is not a valid price.`,
    },
  },
  timesSold: {
    type: Number,
    default: 0,
    min: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema, "menu_items");

export { MenuItem };
