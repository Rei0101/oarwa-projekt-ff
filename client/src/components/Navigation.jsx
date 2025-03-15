import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/menu">Meni</Link>
        <Link to="/make-a-meal">Make-A-Meal</Link>
        <Link to="/order">Narudžba</Link>
      </nav>
    </div>
  );
}
