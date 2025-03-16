import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function LinkCard({ step, instruction, path, name }) {
  return (
    <div>
      <h4>{step}. KORAK</h4>
      <p>{instruction}</p>
      <Link to={path}>
        <button>{name}</button>
      </Link>
    </div>
  );
}

LinkCard.propTypes = {
  step: PropTypes.string.isRequired,
  instruction: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
