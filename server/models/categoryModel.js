import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["ingredient", "menuItem"],
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export { Category };
