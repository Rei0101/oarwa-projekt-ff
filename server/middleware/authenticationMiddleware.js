import CONFIG from "../config/config.js";
import jwt from "jsonwebtoken";
import CustomError from "../../shared/CustomErrorClass.js";
import { User } from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return next(new CustomError(401, "Authorization header not found."));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(new CustomError(401, "Bearer token not found."));
    }

    const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);

    if (!(await User.findOne({ email: decodedToken.email }))) {
      return next(new CustomError(404));
    }

    req.userRole = decodedToken.role;
    
    next();
  } catch (error) {
    next(error || new CustomError(401));
  }
};

export default authenticateUser;
