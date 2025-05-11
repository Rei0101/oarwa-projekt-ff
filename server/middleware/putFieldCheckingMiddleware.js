import CustomError from "../../shared/CustomErrorClass.js";

const putFieldCheckingMiddleware = (requiredFields) => (req, res, next) => {
  const missingFields = requiredFields.filter((f) => !(f in req.body));

  if (missingFields.length) {
    return next(
      new CustomError(400, "Missing fields: " + missingFields.join(", "))
    );
  }

  next();
};

export default putFieldCheckingMiddleware;
