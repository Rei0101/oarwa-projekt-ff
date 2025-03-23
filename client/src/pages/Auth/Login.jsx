import "./Auth.css";
import Input from "../../components/Input";
import ErrorText from "../../components/ErrorText";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import axios from "axios";

function Login() {
  const { formData, handleChange, error, setError } = useForm({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { email, password } = formData;

      if (!email || !password) {
        setError("Forma nije popunjena.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      setError("Uneseni su netočni podaci.");
      console.error("Error object:", error);
    }
  };


  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleLogin}>
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
