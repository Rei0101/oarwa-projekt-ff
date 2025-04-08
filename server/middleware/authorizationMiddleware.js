import CustomError from "../../shared/CustomErrorClass.js";

const authorizeUser = (role) => (req, res, next) => {
  if (req.dbUser && req.dbUser.role === role) {
    next();
  } else {
    return next(new CustomError(403));
  }
};

export default authorizeUser;
