import { REGEX } from "../../../shared/regex";

function registerValidation(name, value, password) {
  if (!value.trim()) {
    return "Ovo polje mora biti popunjeno.";
  } else {
    switch (name) {
      case "firstName":
        if (!REGEX.LETTERS_ONLY.test(value)) {
          return "Ime ne smije sadržavati posebne znakove/brojeve.";
        } else {
          return null;
        }
      case "lastName":
        if (!REGEX.LETTERS_ONLY.test(value)) {
          return "Prezime ne smije sadržavati posebne znakove/brojeve.";
        } else {
          return null;
        }
      case "email":
        if (!REGEX.VALID_EMAIL.test(value)) {
          return "Molimo da unesete pravilnu e-mail adresu.";
        } else {
          return null;
        }
      case "password":
        if (!REGEX.MIN_1_CAPITAL_LETTER.test(value)) {
          return "Lozinka treba sadržavati minimalno 1 veliko slovo.";
        } else if (!REGEX.MIN_3_DIGITS.test(value)) {
          return "Lozinka treba sadržavati minimalno 3 znamenke.";
        } else if (!REGEX.MIN_1_COMMON_PUNCTUATION.test(value)) {
          return "Lozinka treba sadržavati minimalno 1 (česti) interpunkcijski znak.";
        } else if (value.length < 8) {
          return "Lozinka treba sadržavati minimalno 8 znakova.";
        } else {
          return null;
        }
      case "confirmPassword":
        if (value !== password) {
          return "Lozinke nisu iste. Molimo pokušajte ponovno.";
        } else {
          return null;
        }
      case "city":
        if (!REGEX.LETTERS_ONLY.test(value)) {
          return "Naziv grada ne smije sadržavati posebne znakove/brojeve.";
        } else {
          return null;
        }
      case "address":
        if (!REGEX.VALID_ADDRESS.test(value)) {
          return "Molimo da unesete pravilnu kućnu adresu.";
        } else {
          return null;
        }
      case "phone":
        if (!REGEX.VALID_PHONE_NUMBER.test(value)) {
          return "Molimo da unesete pravilan broj mobitela.";
        } else {
          return null;
        }
      default:
        return null;
    }
  }
}

export { registerValidation };
