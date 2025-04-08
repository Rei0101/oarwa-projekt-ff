import { REGEX } from "../../shared/regex.js";

const validPassword = (password) => {
  return (
    REGEX.MIN_1_CAPITAL_LETTER.test(password) &&
    REGEX.MIN_3_DIGITS.test(password) &&
    REGEX.MIN_1_COMMON_PUNCTUATION.test(password) &&
    password.length > 8
  );
};

export { validPassword };
