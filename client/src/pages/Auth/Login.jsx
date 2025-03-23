import "./Auth.css";
import Input from "../../components/Input";
import ErrorText from "../../components/ErrorText";
import { handleLogin } from "../../utils/handlers";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

function Login() {
  const { formData, handleChange, error, setError } = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={(e) => handleLogin(e, formData, setError, navigate)}>
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
          <button type="submit">Prijavi se</button>
        </form>
        <p>
          Nemaš još račun? <Link to="/register">Registriraj se!</Link>
        </p>  
        <ErrorText error={error} />
      </div>
    </div>
  );
}

export default Login;
