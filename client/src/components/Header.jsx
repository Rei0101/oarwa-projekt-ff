import { useState } from "react";
import blankProfile from "../assets/pfp_blank.png";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  const[textColor, setTextColor] = useState("black");

  return (
    <header>
      <Logo />
      <div>
        <Navigation />
        <div className="profile-box">
          <a href="#"><h5 onMouseEnter={() => (setTextColor("gold"))} onMouseLeave={() => (setTextColor("black"))} style={{color:textColor}}>PRIJAVA</h5></a>
          <a href="#"><img onMouseEnter={() => (setTextColor("gold"))} onMouseLeave={() => (setTextColor("black"))} src={blankProfile} alt="slika profila" /></a>
        </div>
      </div>
    </header>
  );
}
