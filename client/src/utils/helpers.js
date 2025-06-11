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

function fetchImageByCategory(imageLink, category) {
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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function descSortAttribute(object, attribute) {
  return object.sort((a, b) => b.type.localeCompare(a.type))[0]?.[attribute];
}

function includeValidAttributes(objectToCheck) {
  let included = [];

  for (const [key, value] of Object.entries(objectToCheck)) {
    if (value.checked) {
      included.push(key);
    }
  }

  return included;
}

function kebabCase(string) {
  return string.toLowerCase().split(" ").join("-");
}

function formatFromKebabCase(string) {
  return capitalize(string).split("-").join(" ");
}

function sortByObjectAttribute(array) {
  return array.sort((a, b) => (a.type < b.type ? 1 : a.type > b.type ? -1 : 0));
}

export {
  decodeJWT,
  fetchImageByCategory,
  deepCopy,
  allFieldsChanged,
  formatDate,
  capitalize,
  descSortAttribute,
  includeValidAttributes,
  kebabCase,
  formatFromKebabCase,
  sortByObjectAttribute,
};
