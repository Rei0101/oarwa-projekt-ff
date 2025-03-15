import { Link } from "react-router-dom";
import Button from "./Button";
import PropTypes from "prop-types";

export default function LinkCard({ step, instruction, path, name }) {
  return (
    <div>
      <h4>{step}. KORAK</h4>
      <p>{instruction}</p>
      <Link to={path}>
        <Button name={name} />
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
