import "./Auth.css";
import ControlledInput from "../../components/ControlledInput";
import { Link } from "react-router-dom";

function Registration() {
  return (
    <div className="container">
      <div className="form-box">
        <form>
          <ControlledInput
            name="firstName"
            label="Ime"
            required
          ></ControlledInput>
          <ControlledInput
            name="lastName"
            label="Prezime"
            required
          ></ControlledInput>
          <ControlledInput
            name="email"
            label="E-mail"
            type="email"
            required
          ></ControlledInput>
          <ControlledInput
            name="password"
            label="Lozinka"
            type="password"
            required
          ></ControlledInput>
          <ControlledInput
            name="confirmPassword"
            label="Potvrdi lozinku"
            type="password"
            required
          ></ControlledInput>
          <ControlledInput
            name="dateOfBirth"
            label="Datum rođenja (opcionalno)"
            type="date"
            required
          ></ControlledInput>
          <ControlledInput name="city" label="Grad" required></ControlledInput>
          <ControlledInput
            name="address"
            label="Adresa"
            required
          ></ControlledInput>
          <button type="submit">Registriraj se</button>
        </form>
        <p>
          Već imaš račun? <Link to="/login">Prijavi se</Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;
