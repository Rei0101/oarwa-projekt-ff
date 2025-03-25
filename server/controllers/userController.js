import CONFIG from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../../shared/CustomErrorClass.js"
import { User } from "../models/userModel.js";
import { checkFieldAppearance } from "../utils/helpers.js";

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

const loginUser = async (req, res, next) => {
  try {
    const dbUser = await User.findOne({ email: req.body.email });

    if (
      dbUser &&
      (await bcrypt.compare(req.body.password, dbUser.password))
    ) {
      const token = jwt.sign(
        { email: dbUser.email, role: dbUser.role },
        CONFIG.JWT_SECRET,
        { expiresIn: CONFIG.JWT_EXPIRATION }
      );
      res.json({ token });
    } else {
      throw new CustomError(401);
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
