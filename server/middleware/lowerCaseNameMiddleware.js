import CustomError from "../../shared/CustomErrorClass.js";

const lowerCaseNameMiddleware = (req, res, next) => {
  try {
    const { name } = req.body || {};

    if (name && typeof name !== "string") {
      return next(new CustomError(400, 'Invalid "name" field'));
    }

    if (name) {
      req.name = name.toLowerCase();
    }

    next();
  } catch (error) {
    console.error(error);
    next(new CustomError(500));
  }
};

export default lowerCaseNameMiddleware;
