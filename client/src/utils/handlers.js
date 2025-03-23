import axios from "axios";

function handleChange(e, setFormData) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  async function handleLogin(e, formData, setError, navigate){
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

      console.log(response);
      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
      setError("Uneseni podaci su netočni.");
      console.error("Error object:", error);
    }
  };

  async function handleRegister(e, formData, setError, navigate) {
    e.preventDefault();
    setError(null);

    // Add your validation logic here

    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/register",
        formData
      );

      console.log(response);
      
      navigate("/login");
    } catch (error) {
      setError(error.message || "Register failed.");
      console.error(error);
    }
  };

export { handleChange, handleLogin, handleRegister };