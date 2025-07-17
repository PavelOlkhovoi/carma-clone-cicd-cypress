const CustomH3 = ({ title, styles }) => {
  return (
    <h3
      className="mt-0 mb-0"
      style={{ fontSize: "14px", color: "#474747", ...styles }}
    >
      {title}
    </h3>
  );
};

export default CustomH3;
