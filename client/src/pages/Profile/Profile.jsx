import "./Profile.css";
import useAuthContext from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { fetchDocument } from "../../utils/handlers/handlers";

function Profile() {
  const { user } = useAuthContext();

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

  return (
    <div className="container">
      {!error ? (
        <>
          <table >
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
          </table>
          <div>
            <button>Promijeni lozinku</button>
            <button>Odjavi se</button>
          </div>
        </>
      ) : (
        <h3>{error}</h3>
      )}
    </div>
  );
}

export default Profile;
