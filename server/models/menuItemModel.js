import mongoose from "mongoose";
const { Schema } = mongoose;

const menuItemSchema = new Schema({
  imageLink: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Category",
    required: true,
  },
  ingredients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Ingredient",
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  timesSold: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema, "menu_items");

export { MenuItem };
