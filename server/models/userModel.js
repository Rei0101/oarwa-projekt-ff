import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dateOfBirth: Date,
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  role: { 
    type: String,
    enum: ["customer", "chef"],
    default: "customer"
  }
});

const User = mongoose.model("User", userSchema);

export { User };
