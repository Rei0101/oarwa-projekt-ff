import "./Auth.css";
import Input from "../../components/Input";
import { handleRegister } from "../../utils/handlers";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

function Register() {
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
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={(e) => handleRegister(e, formData, setError, navigate)}>
          <Input
            name="firstName"
            label="Ime"
            value={formData.firstName}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="lastName"
            label="Prezime"
            value={formData.lastName}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="password"
            label="Lozinka"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="confirmPassword"
            label="Potvrdi lozinku"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="dateOfBirth"
            label="Datum rođenja (opcionalno)"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
          ></Input>
          <Input
            name="city"
            label="Grad"
            value={formData.city}
            onChange={handleChange}
            required
          ></Input>
          <Input
            name="address"
            label="Adresa"
            value={formData.address}
            onChange={handleChange}
            required
          ></Input>
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

export default Register;
