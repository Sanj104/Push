const Hero = ({ text, backdrop }) => {
  return (
    <header
      className="bg-dark text-white text-center mb-4 position-relative"
      style={{
        backgroundImage:
          backdrop && backdrop !== "N/A" ? `url(${backdrop})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Shadow overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: "rgba(0, 0, 0, 0.5)", // dark shadow
          boxShadow: "inset 0 0 100px rgba(0, 0, 0, 0.7)", // extra soft shadow
        }}
      ></div>

      {/* Text on top */}
      <h1 className="display-4 position-relative">{text}</h1>
    </header>
  );
};

export default Hero;
