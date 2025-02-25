import PropTypes from "prop-types";
import logo from "../assets/burger-cartoon-logo.png";


export default function Logo({className}) {
  return <img className={className} src={logo} alt="Meat Your Maker logo" />;
}

Logo.propTypes = {
  className: PropTypes.string,
}