import CONFIG from "../config/config.js";
import jwt from "jsonwebtoken";
import CustomError from "../../shared/CustomErrorClass.js"
import { User } from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw new CustomError(401, "Authorization header not found.");
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new CustomError(401, "Bearer token not found.");
    }

    const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
    const dbUser = await User.findOne({ email: decodedToken.email });
    
    if (!dbUser) {
      throw new CustomError(404);
    }
    req.dbUser = dbUser;

    next();
  } catch (error) {
    next(error || new CustomError(401));
  }
}

export default authenticateUser;