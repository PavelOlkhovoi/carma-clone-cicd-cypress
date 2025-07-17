const InfoBar = ({ title, children, className }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <h4 className={`font-semibold text-lg m-0 ${className}`}>{title}</h4>
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
};

export default InfoBar;
