import CONFIG from "../config/config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import CustomError from "../../shared/CustomErrorClass.js";
import { User } from "../models/userModel.js";
import { validPassword } from "../utils/validation.js";
import { determineUserRole } from "../utils/helpers.js";

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
      role: determineUserRole(email),
    });

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
        { id: dbUser._id, email: dbUser.email, role: dbUser.role },
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

const changePassword = async (req, res, next) => {
  try {
    const { id, currentPassword, newPassword } = req.body;
    const dbUser = await User.findById(id);

    if (!(dbUser && (await bcrypt.compare(currentPassword, dbUser.password)))) {
      return next(new CustomError(401, "Current password not verified."));
    }

    if (!validPassword(newPassword)) {
      return next(
        new CustomError(
          400,
          `NewPassword: ${newPassword} is not a valid password.`
        )
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(id, {
      ...req.body,
      password: hashedPassword,
    });

    res.status(200).send({ message: "Password successfully updated." });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, changePassword };
