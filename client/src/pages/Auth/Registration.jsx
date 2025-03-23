import "./Auth.css";
import ControlledInput from "../../components/Input";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";

function Registration() {
  const { formData, handleChange, error, setError } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    city: "",
    address: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Add your validation logic here

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );

      console.log(response);
      // Handle successful registration (e.g., redirect, show success message, etc.)
    } catch (error) {
      setError(error.message || "Registration failed.");
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <form>
          <ControlledInput
            name="firstName"
            label="Ime"
            value={formData.firstName}
            onChange={handleChange}
            required
          ></ControlledInput>
          <ControlledInput
            name="lastName"
            label="Prezime"
            value={formData.lastName}
            onChange={handleChange}
            required
          ></ControlledInput>
          <ControlledInput
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></ControlledInput>
          <ControlledInput
            name="password"
            label="Lozinka"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          ></ControlledInput>
          <ControlledInput
            name="confirmPassword"
            label="Potvrdi lozinku"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          ></ControlledInput>
          <ControlledInput
            name="dateOfBirth"
            label="Datum rođenja (opcionalno)"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
          ></ControlledInput>
          <ControlledInput name="city" label="Grad" required></ControlledInput>
          <ControlledInput
            name="address"
            label="Adresa"
            value={formData.address}
            onChange={handleChange}
            required
          ></ControlledInput>
          <button type="submit">Registriraj se</button>
        </form>
        <p>
          Već imaš račun? <Link to="/login">Prijavi se</Link>
        </p>
        <p className={`error ${error ? "visible" : ""}`}>{error}</p>
      </div>
    </div>
  );
}

export default Registration;
