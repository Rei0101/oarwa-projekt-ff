import CustomError from "../../shared/CustomErrorClass.js"

const authorizeUser = (role) => (req, res, next) => {
    if (req.dbUser && req.dbUser.role === role) {
      next();
    } else {
      throw new CustomError(403);
    }
  };

export default authorizeUser;