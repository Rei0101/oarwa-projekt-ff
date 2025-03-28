const REGEX = {
  LETTERS_ONLY: /^[^0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
  VALID_EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  MIN_1_CAPITAL_LETTER: /.*\p{Lu}/u,
  MIN_3_DIGITS: /(?:.*[0-9]){3,}/,
  MIN_1_COMMON_PUNCTUATION: /[!@#$%^&*()_+\-={}\[\]|\\:;"'<>,.?\/]/,
  VALID_ADDRESS: /^(?!.*[^ \p{L}0-9,.-]).*(?:\d[ ].+|.+[ ]\d).*/u,
  VALID_PHONE_NUMBER: /^[+]?[\d\s().-]+$/,
};

export { REGEX };
