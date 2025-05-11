import CustomError from "../../shared/CustomErrorClass.js";

const lowerCaseNameMiddleware = (req, res, next) => {
  try {
    if (!req.body || typeof req.body.name !== 'string') {
      return next(new CustomError(400, "Missing or invalid \"name\" field"));
    }

    req.name = req.body.name.toLowerCase();

    next();
  } catch (error) {
    console.error(error);
    next(new CustomError(500));
  }
};

export default lowerCaseNameMiddleware;
