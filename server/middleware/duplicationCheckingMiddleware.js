import CustomError from "../../shared/CustomErrorClass.js";

const duplicationCheckingMiddleware =
  (fields, Model) => async (req, res, next) => {
    try {
      for (const field in fields) {
        const value = req.body[field];

        if (await Model.findOne({ [field]: value })) {
          console.log("oh nohs");
          next(new CustomError(409));
        }
      }
      next();
    } catch (error) {
      console.error(error);
      next(new CustomError(500));
    }
  };

export default duplicationCheckingMiddleware;
