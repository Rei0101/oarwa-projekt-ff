import { useState } from "react";
import blankProfile from "../assets/pfp-blank.png";
import Logo from "./Logo";
import Navigation from "./Navigation";
import useAuthContext from "../hooks/useAuthContext";

export default function Header() {
  const { user } = useAuthContext();
  const [textColor, setTextColor] = useState("black");

  return (
    <header>
      <Logo />
      <div>
        <Navigation />
        <div className="profile-box">
          <a href="/login">
            <h5
              onMouseEnter={() => setTextColor("gold")}
              onMouseLeave={() => setTextColor("black")}
              style={{ color: textColor }}
            >
              {user?.role ? "PROFIL" : "PRIJAVA"}
            </h5>
          </a>
          <a href="/login">
            <img
              onMouseEnter={() => setTextColor("gold")}
              onMouseLeave={() => setTextColor("black")}
              src={blankProfile}
              alt="slika profila"
            />
          </a>
        </div>
      </div>
    </header>
  );
}
