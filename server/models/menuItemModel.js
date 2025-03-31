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
  },
  description: {
    type: String,
    default: null,
  },
  price: {
    type: Number,
    required: true,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);

export { MenuItem };
