import blankProfile from "../assets/pfp_blank.png";
import Logo from "./Logo";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header>
      <Logo />
      <div>
        <Navigation />
        <img src={blankProfile} alt="slika profila" />
      </div>
    </header>
  );
}
