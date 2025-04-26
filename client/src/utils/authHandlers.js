import CustomError from "../../../shared/CustomErrorClass";
import handleError from "./errorHandler";
import axios from "axios";

async function handleLogin(e, formData, setError, navigate) {
  e.preventDefault();
  setError(null);

  try {
    const { email, password } = formData;

    if (!email || !password) {
      throw new CustomError(403, "Nisu popunjeni svi potrebni podaci.");
    }

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/users/login`,
      {
        email,
        password,
      }
    );

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
      `${import.meta.env.VITE_API_URL}/users/register`,
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

export { handleLogin, handleRegister };
