import LogoIcon from "../../../assets/logo.png";
const Logo = ({
  classes = "text-base font-semibold ml-auto",
  showText = true,
}) => {
  return (
    <>
      {!showText && (
        <div className="flex flex-wrap justify-center items-center gap-1">
          <img src={LogoIcon} alt="LagIS-online" style={{ width: "28px" }} />
          <span className={classes}>LagIS-online</span>
        </div>
      )}
    </>
  );
};

export default Logo;
