function BAD_REQUEST(res, mes) {
  return res.status(400).json({
    success: false,
    errorCode: "BAD_REQUEST",
    message: mes || "Sent data is invalid.",
  });
}

function NOT_AUTHORIZED(res, mes) {
  return res.status(401).json({
    success: false,
    errorCode: "NOT_AUTHORIZED",
    message: mes || "Accessing resource is not authorized.",
  });
}

function FORBIDDEN(res, mes) {
  return res.status(403).json({
    success: false,
    errorCode: "FORBIDDEN",
    message: mes || "Access denied.",
  });
}

function NOT_FOUND(res, mes) {
  return res.status(404).json({
    success: false,
    errorCode: "NOT_FOUND",
    message: mes || "Requested resources not found.",
  });
}

function CONFLICT(res, mes) {
  return res.status(409).json({
    success: false,
    errorCode: "CONFLICT",
    message: mes || "A request conflict has occurred.",
  });
}

function INTERNAL_SERVER_ERROR(res, mes) {
  return res.status(500).json({
    success: false,
    errorCode: "INTERNAL_SERVER_ERROR",
    message: mes || "Error when fetching data.",
  });
}

export {
  BAD_REQUEST,
  NOT_AUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
};
