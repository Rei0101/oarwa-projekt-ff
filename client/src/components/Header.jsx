import { useState } from "react";
import blankProfile from "../assets/pfp-blank.png";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
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
              PRIJAVA
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
