import "./Profile.css";
import useAuthContext from "../../hooks/useAuthContext";
import useInitialFetch from "../../hooks/useInitialFetch";
import { fetchDocument } from "../../utils/handlers/handlers";
import { useState } from "react";

function Profile() {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  
  const userInfo =  useInitialFetch(
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
    ["users", user?.id, setError]
  );
  
  return (
    <div className="container">
      {userInfo && console.log(userInfo)}
      {!error ? <div id="user-info">Profil</div> : <h3>{error}</h3>}
    </div>
  );
}

export default Profile;
