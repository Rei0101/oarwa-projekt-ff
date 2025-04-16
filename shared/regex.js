const REGEX = {
  LETTERS_ONLY: /^[^0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
  VALID_EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  MIN_1_CAPITAL_LETTER: /.*\p{Lu}/u,
  MIN_3_DIGITS: /(?:.*[0-9]){3,}/,
  MIN_1_COMMON_PUNCTUATION: /[!@#$%^&*()_+\-={}\[\]|\\:;"'<>,.?\/]/,
  VALID_ADDRESS: /^(?!.*[^ \p{L}0-9,.-]).*(?:\d[ ].+|.+[ ]\d).*/u,
  VALID_PHONE_NUMBER: /^[+]?[\d\s().-]+$/,
  VALID_DATE_FORMAT: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  VALID_URL: /\b(https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?)\b(?!\s)/,
  VALID_PRICE: /^\d+(\.\d{1,2})?$/
};

export { REGEX };
