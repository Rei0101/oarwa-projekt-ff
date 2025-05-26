import "./Profile.css";
import useAuthContext from "../../hooks/useAuthContext";
import useFetch from "../../hooks/useFetch";
import { fetchDocument } from "../../utils/handlers/handlers";

function Profile() {
  const { user } = useAuthContext();

  const {
    fetched,
    error
  } = useFetch(
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
      {!error ? <div id="user-info">Profil od {fetched.firstName}</div> : <h3>{error}</h3>}
    </div>
  );
}

export default Profile;
