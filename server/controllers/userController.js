import { User } from "../models/userModel.js";

const newUser = async (req, res) => {
  const { firstName, lastName, email, password, dateOfBirth, city, address } =
    req.body;

  const newUser = new User({
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    city,
    address,
  });
  try {
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export { newUser };
