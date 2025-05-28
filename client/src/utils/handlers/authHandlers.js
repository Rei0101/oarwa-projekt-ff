import CustomError from "../../../../shared/CustomErrorClass";
import userService from "../../services/userService";
import handleError from "./errorHandler";
import { decodeJWT } from "../helpers";

async function handleLogin(e, formData, setError, login, navigate) {
  e.preventDefault();
  setError(null);

  try {
    const { email, password } = formData;

    if (!email || !password) {
      throw new CustomError(403, "Nisu popunjeni svi potrebni podaci.");
    }

    const response = await userService.login(email, password)

    localStorage.setItem("token", response.token);

    const decoded = decodeJWT(response.token);
    login(decoded.payload);

    navigate("/");
  } catch (error) {
    if (!error?.status || !error?.response?.status) {
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
    await userService.register(formData);

    navigate("/login");
  } catch (error) {
    if (error?.status === 409 || error?.response?.status === 409) {
      error = new CustomError(
        409,
        "Ovaj korisnik već postoji. Molimo pokušajte ponovno."
      );
    }

    handleError(error, setError);
  }
}

async function handleLogout(e, logout, navigate) {
  e.preventDefault();

  logout();

  navigate("/login")
}

export { handleLogin, handleRegister, handleLogout };
