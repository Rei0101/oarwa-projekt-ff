import CONFIG from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../../shared/CustomErrorClass.js";
import { User } from "../models/userModel.js";
import { validPassword } from "../utils/validation.js";
import { handleUserRole } from "../utils/handlers.js";
import { checkFieldAppearance } from "../utils/helpers.js";

const registerUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!validPassword(password)) {
      return next(
        new CustomError(400, `Password: ${password} is not a valid password.`)
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
      role: handleUserRole(email),
    });

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

    if (dbUser && (await bcrypt.compare(req.body.password, dbUser.password))) {
      const token = jwt.sign(
        { email: dbUser.email, role: dbUser.role },
        CONFIG.JWT_SECRET,
        { expiresIn: CONFIG.JWT_EXPIRATION }
      );
      res.json({ token });
    } else {
      return next(new CustomError(401));
    }
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser };
