import "./Profile.css";
import useAuthContext from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { fetchDocument } from "../../utils/handlers/handlers";
import { handleLogout } from "../../utils/handlers/authHandlers";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useAuthContext();
  const { fetched, error } = useFetch(
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
  const navigate = useNavigate();


  return (
    <div className="container">
      {!error ? (
        <div id="profile">
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
                <th>Lozinka:</th>
                <td>●●●●●●●●●</td>
              </tr>
              <tr>
                <th>Datum rođenja:</th>
                <td>{fetched.dateOfBirth.slice(0, 10)}</td>
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
            <button>Promijeni lozinku</button>
            <button onClick={(e) => handleLogout(e, logout, navigate)}>Odjavi se</button>
          </div>
        </div>
      ) : (
        <h3>{error}</h3>
      )}
    </div>
  );
}

export default Profile;
