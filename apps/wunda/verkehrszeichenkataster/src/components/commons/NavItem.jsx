import { Link, useLocation } from "react-router-dom";
import { useIntersectionObserver } from "@uidotdev/usehooks";

const NavItem = ({ application, setItems }) => {
  const { pathname } = useLocation();
  const [ref, entry] = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: "0%",
  });

  const getApplicationPath = (id) => {
    const parts = pathname.split("/");
    const currentId = parts[2];

    let newPath = pathname.replace(`/${currentId}/`, `/${id}/`);
    if (!newPath.includes("/anordnung/")) {
      newPath = "/anordnung/" + id + "/verlauf";
    }
    return newPath;
  };

  if (entry && !entry.isIntersecting) {
    setItems(application);
  }

  return (
    <Link to={getApplicationPath(application?.id)}>
      <div
        ref={ref}
        className={`${
          pathname.includes("anordnung/" + application?.id + "/")
            ? "text-primary"
            : ""
        } font-semibold no-underline w-fit px-4 py-[10px] hover:bg-zinc-100 rounded-lg ${
          entry && !entry.isIntersecting && "hidden"
        }`}
      >
        <div className="hidden md:block truncate text-sm">
          {application.timelineTitle
            ? application.timelineTitle + " #" + application.id
            : application?.name}
        </div>
      </div>
    </Link>
  );
};

export default NavItem;
