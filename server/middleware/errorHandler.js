import {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} from "../utils/errorCodes.js";

const errorHandler = async (err, req, res, next) => {
  console.error(err.stack);
  console.error(`Error occurred with method ${req.method} at path ${req.url}`);

  const status = err.statusCode || 500;

  switch (status) {
    case 400:
      return BAD_REQUEST(res, err.message);
    case 401:
      return UNAUTHORIZED(res, err.message);
    case 403:
      return FORBIDDEN(res, err.message);
    case 404:
      return NOT_FOUND(res, err.message);
    case 409:
      return CONFLICT(res, err.message);
    default:
      return INTERNAL_SERVER_ERROR(res, err.message);
  }
};

export default errorHandler;
