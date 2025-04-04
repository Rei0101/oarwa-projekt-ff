import mongoose from "mongoose";
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  imageLink: {
    type: String,
    required: true,
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
  price: {
    type: Number,
    required: true,
  },
});

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

export { Ingredient };
