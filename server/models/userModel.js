import { REGEX } from "../../shared/regex.js";
import { formatDate } from "../../shared/helpers.js";
import mongoose from "mongoose";
const { Schema } = mongoose;

const today = new Date();

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return REGEX.LETTERS_ONLY.test(value);
      },
      message: (props) => `${props.value} is not a valid first name.`,
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return REGEX.LETTERS_ONLY.test(value);
      },
      message: (props) => `${props.value} is not a valid last name.`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return REGEX.VALID_EMAIL.test(value);
      },
      message: (props) => `${props.value} is not a valid email.`,
    },
  },
  password: {
    type: String,
    required: true,
    //* Password format is validated before hashing (in userController.js file)
  },
  dateOfBirth: {
    type: Date,
    default: null,
    validate: {
      validator: function (value) {
        return (
          value === null ||
          (REGEX.VALID_DATE_FORMAT.test(formatDate(value)) &&
            formatDate(value) < formatDate(today))
        );
      },
      message: (props) => `${props.value} is not a valid date of birth.`,
    },
  },
  city: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return REGEX.LETTERS_ONLY.test(value);
      },
      message: (props) => `${props.value} is not a valid city.`,
    },
  },
  address: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return REGEX.VALID_ADDRESS.test(value);
      },
      message: (props) => `${props.value} is not a valid address.`,
    },
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return REGEX.VALID_PHONE_NUMBER.test(value);
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const User = mongoose.model("User", userSchema);

export { User };
