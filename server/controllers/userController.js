import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { checkFieldAppearance } from "../utils/userHelpers.js";

const registerUser = async (req, res, next) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ ...req.body, password: hashedPassword });

  try {
    await checkFieldAppearance({ email }, User);
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    next(error);
  }
};

export { registerUser };
