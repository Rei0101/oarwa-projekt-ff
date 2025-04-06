import "./Auth.css";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/ErrorText";
import { handleFocus, handleBlur, handleRegister } from "../../utils/handlers";
import { Link, useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

function Register() {
  const {
    formData,
    setFormData,
    borderColors,
    handleChange,
    formErrors,
    error,
    setError,
  } = useForm({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    city: "",
    address: "",
    phone: "",
  });
  const navigate = useNavigate();

  const today = new Date();

  return (
    <div className="container">
      <div className="form-box register">
        <form
          onSubmit={(e) =>
            handleRegister(e, formData, formErrors, setError, navigate)
          }
        >
          <FormInput
            name="firstName"
            label="Ime"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="npr. Ivan"
            required
            borderColor={borderColors.firstName}
            onFocus={handleFocus(formErrors, setError)}
            onBlur={handleBlur(setFormData)}
          />
          <FormInput
            name="lastName"
            label="Prezime"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="npr. Horvat"
            required
            borderColor={borderColors.lastName}
            onFocus={handleFocus(formErrors, setError)}
            onBlur={handleBlur(setFormData)}
          />
          <FormInput
            name="email"
            label="E-mail"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="primjer@email.com"
            required
            borderColor={borderColors.email}
            onFocus={handleFocus(formErrors, setError)}
            onBlur={handleBlur(setFormData)}
          />
          <FormInput
            name="password"
            label="Lozinka"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
            borderColor={borderColors.password}
            maxLength={128}
            onFocus={handleFocus(formErrors, setError)}
          />
          <FormInput
            name="confirmPassword"
            label="Potvrdi lozinku"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            borderColor={borderColors.confirmPassword}
            maxLength={128}
            onFocus={handleFocus(formErrors, setError)}
          />
          <FormInput
            name="dateOfBirth"
            label="Datum rođenja (opcionalno)"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            borderColor={borderColors.dateOfBirth}
            max={String(today.toISOString().slice(0, 10))}
            maxLength={20}
            onFocus={handleFocus(formErrors, setError)}
          />
          <FormInput
            name="city"
            label="Grad"
            value={formData.city}
            onChange={handleChange}
            placeholder="npr. Split"
            required
            borderColor={borderColors.city}
            onFocus={handleFocus(formErrors, setError)}
            onBlur={handleBlur(setFormData)}
          />
          <FormInput
            name="address"
            label="Adresa"
            value={formData.address}
            onChange={handleChange}
            placeholder="Neka ulica 123"
            required
            borderColor={borderColors.address}
            onFocus={handleFocus(formErrors, setError)}
            onBlur={handleBlur(setFormData)}
          />
          <FormInput
            name="phone"
            label="Broj mobitela"
            value={formData.phone}
            onChange={handleChange}
            required
            borderColor={borderColors.phone}
            maxLength={30}
            onFocus={handleFocus(formErrors, setError)}
            onBlur={handleBlur(setFormData)}
          />
          <button type="submit">Registriraj se</button>
        </form>
        <p>
          Već imaš račun? <Link to="/login">Prijavi se!</Link>
        </p>
        <ErrorText error={error} />
      </div>
    </div>
  );
}

export default Register;
