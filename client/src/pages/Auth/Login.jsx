import "./Auth.css";
import ControlledInput from "../../components/ControlledInput";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="container">
      <div className="form-box">
        <form>
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
          <button type="submit">Prijavi se</button>
        </form>
        <p>
          Nemaš još račun? <Link to="/registration">Registriraj se!</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
