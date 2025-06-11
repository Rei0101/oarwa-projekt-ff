import Navigation from "./Navigation";
import useThemeContext from "../hooks/useThemeContext";

export default function Footer() {
  const { setTheme } = useThemeContext();

  return (
    <footer>
      <div>
        <h5>STRANICE</h5>
        <Navigation />
      </div>
      <div>
        <h5>TEMA</h5>
        <span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setTheme("system");
            }}
          >
            Sistemska
          </a>
          <br />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setTheme("light");
            }}
          >
            Svijetla
          </a>
          <br />
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setTheme("dark");
            }}
          >
            Tamna
          </a>
        </span>
      </div>
      <div className="break"></div>
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
