function BAD_REQUEST(res, mes = "Sent data is invalid.") {
  return res.status(400).json({
    success: false,
    errorCode: "BAD_REQUEST",
    message: mes,
  });
}

function NOT_AUTHORIZED(res, mes = "Accessing resource is not authorized.") {
  return res.status(401).json({
    success: false,
    errorCode: "NOT_AUTHORIZED",
    message: mes,
  });
}

function FORBIDDEN(res, mes = "Access denied.") {
  return res.status(403).json({
    success: false,
    errorCode: "FORBIDDEN",
    message: mes,
  });
}

function CONFLICT(res, mes = "A request conflict has occurred.") {
  return res.status(409).json({
    success: false,
    errorCode: "CONFLICT",
    message: mes,
  });
}

function NOT_FOUND(res, mes = "Requested resources not found.") {
  return res.status(404).json({
    success: false,
    errorCode: "NOT_FOUND",
    message: mes,
  });
}

function INTERNAL_SERVER_ERROR(res, mes = "Error when fetching data.") {
  return res.status(500).json({
    success: false,
    errorCode: "INTERNAL_SERVER_ERROR",
    message: mes,
  });
}

export {
  BAD_REQUEST,
  NOT_AUTHORIZED,
  FORBIDDEN,
  CONFLICT,
  NOT_FOUND,
  INTERNAL_SERVER_ERROR,
};
