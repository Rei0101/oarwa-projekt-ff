import CustomError from "../../../shared/CustomErrorClass";

function decodeJWT(token) {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new CustomError(400, "Invalid JWT token");
  }

  const header = JSON.parse(
    atob(parts[0].replaceAll("-", "+").replaceAll("_", "/"))
  );
  const payload = JSON.parse(
    atob(parts[1].replaceAll("-", "+").replaceAll("_", "/"))
  );
  
  return { header, payload };
}

export { decodeJWT };
