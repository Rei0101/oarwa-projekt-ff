import "./Profile.css";
import { fetchCollection } from "../../utils/handlers/handlers";
import { useState } from "react";

function Profile() {
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(fetchDocument());

  return (<div className="container">Profil</div>);
}

export default Profile;
