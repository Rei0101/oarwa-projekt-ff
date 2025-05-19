import "./Auth.css";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/ErrorText";
import { handleLogin } from "../../utils/handlers/authHandlers";
import { handleBlur } from "../../utils/handlers/handlers";
import { Link, useNavigate } from "react-router-dom";
<<<<<<< HEAD
import useAuthContext from "../../hooks/useAuth";
=======
import useAuthContext from "../../hooks/useAuthContext";
>>>>>>> a172424 (Rename useAuth to useAuthContext for clarity)
import useAuthForm from "../../hooks/useAuthForm";

function Login() {
  const { login } = useAuthContext();
  const { formData, setFormData, handleChange, error, setError } = useAuthForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={(e) => handleLogin(e, formData, setError, login, navigate)}>
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
