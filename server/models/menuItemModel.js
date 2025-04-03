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
    type: [String],
    required: true,
  },
  ingredients: {
    type: [String],
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
