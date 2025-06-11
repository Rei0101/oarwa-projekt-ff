import "./Profile.css";
import useAuthContext from "../../hooks/useAuthContext";
import useBagContext from "../../hooks/useBagContext";
import useFetch from "../../hooks/useFetch";
import useUserForm from "../../hooks/useUserForm";
import { formatDate } from "../../utils/helpers";
import { fetchDocument } from "../../utils/handlers/handlers";
import {
  handleLogout,
  handlePasswordChange,
} from "../../utils/handlers/authHandlers";
import FormInput from "../../components/FormInput";
import ErrorText from "../../components/ErrorText";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const passwordChangeState = {
  0: "Promijeni lozinku",
  1: "Potvrdi",
  2: "Spremi promjene",
};

function Profile() {
  const { user, logout } = useAuthContext();
  const { clearBag } = useBagContext();

  const { fetched } = useFetch(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      city: "",
      address: "",
      phone: "",
    },
    fetchDocument,
    user ? ["users", user.id] : [],
    [user]
  );
  const { formData, setFormData, handleChange, error, setError } = useUserForm({
    password: "",
  });
  const navigate = useNavigate();
  const [changingPassword, setChangingPassword] = useState(
    passwordChangeState[0]
  );
  const [submittedForm, setSubmittedForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  return (
    <div className="container">
      <form
        id="profile"
        onSubmit={
          !submittedForm
            ? (e) => e.preventDefault()
            : (e) => {
                handlePasswordChange(
                  e,
                  user.id,
                  currentPassword,
                  formData.password,
                  setError
                );
                setFormData({ password: "" });
              }
        }
      >
        <table>
          <tbody>
            <tr>
              <th>Ime:</th>
              <td>{fetched.firstName}</td>
            </tr>
            <tr>
              <th>Prezime:</th>
              <td>{fetched.lastName}</td>
            </tr>
            <tr>
              <th>E-mail:</th>
              <td>{fetched.email}</td>
            </tr>
            <tr>
              {changingPassword === passwordChangeState[0] ? (
                <th>Lozinka:</th>
              ) : changingPassword === passwordChangeState[1] ? (
                <th>Trenutna lozinka:</th>
              ) : (
                <th>Nova lozinka:</th>
              )}
              {changingPassword === passwordChangeState[0] ? (
                <td>●●●●●●●●●</td>
              ) : (
                <td>
                  <FormInput
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    maxLength={128}
                  />
                </td>
              )}
            </tr>
            <tr>
              <th>Datum rođenja:</th>
              <td>{formatDate(fetched.dateOfBirth)}</td>
            </tr>
            <tr>
              <th>Grad:</th>
              <td>{fetched.city}</td>
            </tr>
            <tr>
              <th>Adresa:</th>
              <td>{fetched.address}</td>
            </tr>
            <tr>
              <th>Broj mobitela:</th>
              <td>{fetched.phone}</td>
            </tr>
          </tbody>
        </table>
        <div>
          {changingPassword === passwordChangeState[0] ? (
            <button onClick={(e) => handleLogout(e, clearBag, logout, navigate)}>
              Odjavi se
            </button>
          ) : (
            <button
              onClick={() => {
                setChangingPassword(passwordChangeState[0]);
                setFormData({ password: "" });
              }}
            >
              Odustani
            </button>
          )}
          {fetched.email.split("@")[1] !== "mym.hr" ? (
            changingPassword === passwordChangeState[0] ? (
              <button
                onClick={() => setChangingPassword(passwordChangeState[1])}
              >
                {passwordChangeState[0]}
              </button>
            ) : changingPassword === passwordChangeState[1] ? (
              <button
                onClick={() => {
                  setCurrentPassword(formData.password);
                  setChangingPassword(passwordChangeState[2]);
                  setFormData({ password: "" });
                }}
              >
                {passwordChangeState[1]}
              </button>
            ) : (
              <button
                onClick={() => {
                  setSubmittedForm(true);
                  setChangingPassword(passwordChangeState[0]);
                }}
              >
                {passwordChangeState[2]}
              </button>
            )
          ) : null}
        </div>
        <ErrorText error={error} />
      </form>
    </div>
  );
}

export default Profile;
