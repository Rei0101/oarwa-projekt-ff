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

function fetchMenuItemImage(imageLink, category) {
  if (imageLink) {
    return imageLink;
  }
  if (category in categoryImagePairs) {
    return categoryImagePairs[category];
  }
  return categoryImagePairs["missing"];
}

function deepCopy(referenceType) {
  return JSON.parse(JSON.stringify(referenceType));
}

function allFieldsChanged(object1, object2) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (
    keys1.length !== keys2.length ||
    !keys1.every((key) => keys2.includes(key))
  ) {
    return false;
  }

  return keys1.every((key) => object1[key] !== object2[key]);
}

function formatDate(date) {
  return date.slice(0, 10).split("-").reverse().join(".");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export {
  decodeJWT,
  fetchMenuItemImage,
  deepCopy,
  allFieldsChanged,
  formatDate,
  capitalize
};
