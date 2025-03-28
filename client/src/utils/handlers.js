import CustomError from "../../../shared/CustomErrorClass";
import handleError from "./errorHandler";
import axios from "axios";

function handleFocus(getter, setError) {
  return function (e) {
    const { name } = e.target;
    setError(getter[name]);
  };
}

function handleBlur(setter) {
  return function (e) {
    const { name, value } = e.target;
    let valueCopy;

    if (name === "email") {
      valueCopy = value;

      setter((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    setTimeout(() => {
      setter((prev) => ({
        ...prev,
        [name]: name === "email" ? valueCopy : value.trim(),
      }));
    }, 0);
  };
}

async function handleLogin(e, formData, setError, navigate) {
  e.preventDefault();
  setError(null);

  try {
    const { email, password } = formData;

    if (!email || !password) {
      throw new CustomError(403, "Nisu popunjeni svi potrebni podaci.");
    }

    const response = await axios.post("http://localhost:3000/api/users/login", {
      email,
      password,
    });

    console.log(response);
    localStorage.setItem("token", response.data.token);

    navigate("/");
  } catch (error) {
    if (!error.statusCode) {
      error = new CustomError(401);
    }
    handleError(error, setError);
  }
}

async function handleRegister(e, formData, formErrors, setError, navigate) {
  e.preventDefault();

  let hasValidationErrors = Object.values(formErrors).some(
    (value) => value !== null
  );

  if (hasValidationErrors) {
    setError(
      "Nisu sva polja pravilno unesena. Molimo provjerite ih prije registracije."
    );
    return;
  }

  setError(null);

  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/register",
      formData
    );

    console.log(response);

    navigate("/login");
  } catch (error) {
    if (error.status === 409 || error.response.status === 409) {
      error = new CustomError(
        409,
        "Ovaj korisnik već postoji. Molimo pokušajte ponovno."
      );
    }

    handleError(error, setError);
  }
}

export { handleFocus, handleBlur, handleLogin, handleRegister };
