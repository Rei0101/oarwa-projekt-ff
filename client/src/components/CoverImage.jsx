import Logo from "./Logo";

export default function CoverImage() {
  return (
    <div id="cover-image">
      <svg
        viewBox="0 0 700 300"
        className="cover-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <path id="curve" d="M 100,200 Q 400,-60 645, 275" fill="transparent" />
        <text>
          <textPath href="#curve">Meat Your Maker</textPath>
        </text>
      </svg>
      <Logo className="burger-logo" />
    </div>
  );
}
