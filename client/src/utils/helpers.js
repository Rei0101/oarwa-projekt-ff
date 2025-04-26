import CustomError from "../../../shared/CustomErrorClass";
import { categoryImagePairs } from "./categoryImagePairs";

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

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now >= payload.exp) {
    throw new CustomError(401, "JWT token has expired");
  }

  return { header, payload };
}

function fetchUserRole() {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeJWT(token);
      const userRole = decoded.payload.role;
      return userRole;
    }
    throw new CustomError(403);
  } catch (error) {
    return new CustomError(error.status, error.message);
  }
}

function fetchMenuItemImage(imageLink, category) {
  if (imageLink) {
    return imageLink;
  }
  if (category in categoryImagePairs) {
    return categoryImagePairs[category];
  }
  return categoryImagePairs["missing"];
}

export { decodeJWT, fetchUserRole, fetchMenuItemImage };
