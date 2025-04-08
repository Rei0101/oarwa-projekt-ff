import PropTypes from "prop-types";

export default function ErrorText({ error }) {
  return <p className={`error ${error ? "visible" : ""}`}>{error}</p>;
}

ErrorText.propTypes = {
  name: PropTypes.string,
};
