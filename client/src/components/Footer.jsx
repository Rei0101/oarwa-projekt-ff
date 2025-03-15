import Navigation from "./Navigation";

export default function Footer() {
  return (
    <footer>
      <div>
        <h5>STRANICE</h5>
        <Navigation />
      </div>
      <div>
        <h5>JEZIK</h5>
        <Navigation />
      </div>
      <div>
        <h5>TEMA</h5>
        <Navigation />
      </div>
      <div>
        <p>
          © {String(new Date().getFullYear())} <i>Meat Your Maker.</i> All
          rights reserved.
        </p>
        <p>Made by Rei Krstić.</p>
      </div>
    </footer>
  );
}
