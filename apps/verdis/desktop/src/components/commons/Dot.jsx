const Dot = ({ showDot }) => {
  return (
    <div
      className={`w-3 h-3 rounded-full bg-primary ${
        showDot ? "absolute" : "hidden"
      } bottom-0 -right-1`}
    />
  );
};

export default Dot;
