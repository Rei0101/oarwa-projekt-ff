import PropTypes from "prop-types";

export default function Review({ image, reviewer, stars, review }) {
  const filledStar = "src/assets/star-fill.png";
  const emptyStar = "src/assets/star-no-fill.png";
  return (
    <div>
      <img src={image} alt="profilna slika recenzenta" />
      <h3>{reviewer}</h3>
      <ul>
        {Array.from({ length: 5 }).map((_, i) => (
          <li key={i}>
            <img
              src={i < stars ? filledStar : emptyStar}
              alt={i < stars ? "zvijezda" : "nema zvijezde"}
            />
          </li>
        ))}
      </ul>
      <p>
        <i>&quot;{review}&quot;</i>
      </p>
    </div>
  );
}

Review.propTypes = {
  image: PropTypes.string.isRequired,
  reviewer: PropTypes.string.isRequired,
  stars: PropTypes.number.isRequired,
  review: PropTypes.string.isRequired,
};
