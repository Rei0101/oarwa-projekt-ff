const BAD_REQUEST = (res, mes) => {
  return res.status(400).json({
    success: false,
    errorCode: "BAD_REQUEST",
    message: mes || "Sent data is invalid.",
  });
};

const UNAUTHORIZED = (res, mes) => {
  return res.status(401).json({
    success: false,
    errorCode: "UNAUTHORIZED",
    message: mes || "Authentication required.",
  });
};

const FORBIDDEN = (res, mes) => {
  return res.status(403).json({
    success: false,
    errorCode: "FORBIDDEN",
    message: mes || "Access denied.",
  });
};

const NOT_FOUND = (res, mes) => {
  return res.status(404).json({
    success: false,
    errorCode: "NOT_FOUND",
    message: mes || "Requested resources not found.",
  });
};

const CONFLICT = (res, mes) => {
  return res.status(409).json({
    success: false,
    errorCode: "CONFLICT",
    message: mes || "A request conflict has occurred.",
  });
};

const INTERNAL_SERVER_ERROR = (res, mes) => {
  return res.status(500).json({
    success: false,
    errorCode: "INTERNAL_SERVER_ERROR",
    message: mes || "Error when fetching data.",
  });
};

export {
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
