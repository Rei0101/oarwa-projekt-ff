import {
  BAD_REQUEST,
  NOT_AUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} from "../utils/errorCodes.js";

export default function errorHandler(err, req, res, next) {
  console.error(err);

  const status = err.status || 500;

  switch (status) {
    case 400:
      return BAD_REQUEST(res, err.message);
    case 401:
      return NOT_AUTHORIZED(res, err.message);
    case 403:
      return FORBIDDEN(res, err.message);
    case 404:
      return NOT_FOUND(res, err.message);
    case 409:
      return CONFLICT(res, err.message);
    default:
      return INTERNAL_SERVER_ERROR(res, err.message);
  }
}
