import CONFIG from "../config/config.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      throw Object.assign(new Error("Authorization header not found."), {
        status: 401,
      });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      throw Object.assign(new Error("Bearer token not found."), {
        status: 401,
      });
    }

    const decodedToken = jwt.verify(token, CONFIG.JWT_SECRET);
    const dbUser = await User.findOne({ email: decodedToken.email });
    
    if (!dbUser) {
      throw (Object.assign(new Error()), { status: 404 });
    }
    req.dbUser = dbUser;

    next();
  } catch (error) {
    next(error || Object.assign(new Error(), { status: 401 }));
  }
}

export default authenticateUser;