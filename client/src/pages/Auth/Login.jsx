import "./Auth.css";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/ErrorText";
import { handleBlur, handleLogin } from "../../utils/handlers";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

function Login() {
  const { formData, setFormData, handleChange, error, setError } = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={(e) => handleLogin(e, formData, setError, navigate)}>
          <FormInput
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="primjer@email.com"
            required
            onBlur={handleBlur(setFormData)}
          />
          <FormInput
            name="password"
            label="Lozinka"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            maxLength={128}
          />
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
