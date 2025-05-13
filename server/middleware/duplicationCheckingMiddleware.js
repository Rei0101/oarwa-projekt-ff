import CustomError from "../../shared/CustomErrorClass.js";

const duplicationCheckingMiddleware =
  (fields, Model) => async (req, res, next) => {
    try {
      const idToExclude = req.params.id;

      for (const field of fields) {
        const value = req[field] ?? req?.body[field];
        if (value === undefined) continue;

        const query = { [field]: value };

        if (idToExclude) {
          query._id = { $ne: idToExclude };
        }

        if (await Model.findOne(query)) {
          return next(new CustomError(409));
        }
      }
      next();
    } catch (error) {
      console.error(error);
      next(new CustomError(500));
    }
  };

export default duplicationCheckingMiddleware;
