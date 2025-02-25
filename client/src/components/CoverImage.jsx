import Logo from "./Logo";

export default function CoverImage() {
  const pathTextShadowValue = `
    5px 0 2px crimson,
    -5px 0 2px crimson,
    0 5px 2px crimson,
    0 -5px 2px crimson,
    4px 4px 2px crimson,
    -4px -4px 2px crimson,
    4px -4px 2px crimson,
    -4px 4px 2px crimson
  `;
  const textPathStyle = {
    fontSize: 64,
    fill: "palevioletred",
    fontFamily: "Chewy",
    letterSpacing: "9px",
    textShadow: pathTextShadowValue,
  };

  return (
    <>
      <svg width="700" height="300">
        <path id="curve" d="M 100,200 Q 400,-60 645, 275" fill="transparent" />
        <text style={textPathStyle}>
          <textPath href="#curve">Meat Your Maker</textPath>
        </text>
      </svg>
      <Logo className="burger-logo" />
    </>
  );
}
