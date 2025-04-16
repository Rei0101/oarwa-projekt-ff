import { REGEX } from "../../shared/regex.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const categorySchema = new Schema({
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
  type: {
    type: String,
    enum: ["ingredient", "menuItem"],
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

export { Category };
