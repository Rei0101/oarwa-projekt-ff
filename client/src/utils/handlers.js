import CustomError from "../../../shared/CustomErrorClass";
import handleError from "./errorHandler";
import axios from "axios";

function handleChange(e, setFormData) {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
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
      error.statusCode = 401;
    }
    handleError(error, setError);
  }
}

async function handleRegister(e, formData, setError, navigate) {
  e.preventDefault();
  setError(null);

  //TODO Add your validation logic here

  try {
    const response = await axios.post(
      "http://localhost:3000/api/users/register",
      formData
    );

    console.log(response);

    navigate("/login");
  } catch (error) {
    handleError(500)
  }
}

export { handleChange, handleLogin, handleRegister };
